import { useSession } from '@roq/nextjs';
import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

interface UseGraphqlQueryProps {
  query: string;
  variables: object;
}
export function useGraphqlQuery(params: UseGraphqlQueryProps | null) {
  const { session } = useSession();
  const parameters =
    params && session?.roqAccessToken
      ? { ...params, headers: { 'roq-platform-authorization': `Bearer ${session.roqAccessToken}` } }
      : null;
  return useSWR(parameters, fetcher);
}
