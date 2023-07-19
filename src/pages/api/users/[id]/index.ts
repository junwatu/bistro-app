import { getServerSession } from '@roq/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { HttpMethod, convertMethodToOperation } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.user
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserById() {
    const body = {
      where: {
        id: req.query.id as string,
      },
      include: {},
    };

    if (Object.keys(body.include).length === 0) {
      delete body.include;
    }
    const user = await prisma.user.findFirst(body);
    return res.status(200).json({
      ...user,
    });
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
