import useSWR, { Fetcher } from 'swr';

import FileCard from 'components/file/file-card';
import { Spinner, Flex } from '@chakra-ui/react';
import { FilesFetchResponse } from 'components/file/types';

import UploadFile from 'components/file/upload-file';

export default function Files() {
  const fetcher: Fetcher<FilesFetchResponse> = (apiURL: string) => fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR('/api/files', fetcher);

  const handleCreateSuccess = () => {
    mutate();
  };

  const handleDelete = () => {
    mutate();
  };

  return (
    <Flex direction="column">
      <UploadFile onSuccess={handleCreateSuccess} onDelete={handleDelete} />

      <Flex wrap="wrap" gap={5} justifyContent={'center'}>
        {isLoading ? <Spinner color="cyan.500" /> : <></>}

        {data?.files?.map((f) => (
          <FileCard file={f} key={f.id} />
        ))}

        {error ? <>{JSON.stringify(error)}</> : <></>}
      </Flex>
    </Flex>
  );
}
