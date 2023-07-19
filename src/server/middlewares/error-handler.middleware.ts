import { AuthorizationForbiddenException } from '@roq/prismajs';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

export function errorHandlerMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({ success: false, error: err.errors, message: 'ValidationError' });
      }
      if (err instanceof AuthorizationForbiddenException) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
