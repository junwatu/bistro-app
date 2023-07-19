export async function fetcher(args: { query: string; variables: object; headers?: object }) {
  const { query, variables, headers = {} } = args;
  const res = await fetch(`${process.env.NEXT_PUBLIC_ROQ_PLATFORM_URL}/v01/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error('Failed to fetch');
  }
  return json.data;
}
