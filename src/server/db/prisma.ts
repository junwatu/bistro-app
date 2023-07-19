import { PrismaClient } from '@prisma/client';
import { createPrismaAuthorizationExtension } from '@roq/prismajs';
import { authorizationClient } from 'server/roq/roq-client';

// https://echobind.com/post/extending-types-for-prisma-extensions-in-nextjs
const extendedPrismaClient = () => {
  const prisma = new PrismaClient({
    log: ['query'],
  });

  const extendedPrisma = prisma.$extends({
    model: {
      $allModels: {
        withAuthorization: createPrismaAuthorizationExtension(authorizationClient),
      },
    },
  });

  return extendedPrisma;
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;

/**
 * Instantiate prisma client for Next.js:
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#solution
 */

declare global {
  // eslint-disable-next-line no-var
  var prisma: ExtendedPrismaClient | undefined;
}

export const prisma = global.prisma || extendedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
