import { getServerSession } from '@roq/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { authorizationClient } from 'server/roq/roq-client';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod } from 'server/utils';

export function authorizationValidationMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getServerSession(req);
    const { roqUserId, user } = session;
    const [mainPath] = req.url.split('?');
    const { allowed } = await authorizationClient.hasAccess(
      convertRouteToEntityUtil(mainPath.split('/').pop()),
      {
        roqUserId,
        roles: user.roles,
        tenantId: user.tenantId,
      },
      convertMethodToOperation(req.method as HttpMethod),
    );
    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await handler(req, res);
  };
}
