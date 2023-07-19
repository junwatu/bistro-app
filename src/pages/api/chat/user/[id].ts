import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, getServerSession } from '@roq/nextjs';
import { roqClient } from 'server/roq';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }

  const session = getServerSession(req, res);
  const { id } = req.query;

  try {
    const result = await roqClient.asUser(session.roqUserId).createConversation({
      conversation: {
        isGroup: false,
        ownerId: session.roqUserId,
        memberIds: [id as string, session.roqUserId],
        title: 'Conversation',
      },
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ data: [], totalCount: 0 });
  }
}

export default function filesHandler(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
