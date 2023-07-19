import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, getServerSession } from '@roq/nextjs';
import { roqClient } from 'server/roq';
import { FilesFetchDto } from 'server/dtos/files-fetch.dto';
import { FileCategories } from 'server/enums';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }

  const { limit, offset } = req.query as FilesFetchDto;
  const session = getServerSession(req, res);

  try {
    const filesResult = await roqClient.asUser(session.roqUserId).files({
      filter: {
        fileCategory: { equalTo: FileCategories.userFiles },
        createdByUserId: { equalTo: session.roqUserId },
      },
      limit,
      offset,
      withCreatedByUser: true,
    });

    // Remove emails and other private information from the nested users
    const filesClean = filesResult.files?.data?.map((f) => {
      return {
        ...f,
        createdByUser: {
          firstName: f.createdByUser?.firstName,
          lastName: f.createdByUser?.lastName,
        },
      };
    });

    res.status(200).json({
      files: filesClean,
      totalCount: filesResult?.files?.totalCount,
    });
  } catch (e) {
    res.status(200).json({ files: [], totalCount: 0 });
  }
}

export default function filesHandler(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
