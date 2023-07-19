/*
  This component showcases the ROQ File upload feature in the controlled mode
  i.e You can manually preview and trigger the upload of the file after it is selected
*/

import React, { useState } from 'react';
import { useRoqFileUploader, FileUpload, FileDropzone } from '@roq/nextjs';
import { Button, Flex, Image } from '@chakra-ui/react';

interface UploadFileProps {
  onSuccess?: () => void;
  onDelete?: (id: string) => void;
}

export default function UploadFile({ onSuccess, onDelete }: UploadFileProps) {
  const [newFile, setNewFile] = useState<File>();

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      onSuccess?.();
      setNewFile(undefined);
    },
    onUploadFail: (err) => {
      console.error(err);
    },
    onChange: ([file]) => {
      setNewFile(file);
    },
    fileCategory: 'USER_FILES',
    onUploadRemoved: onDelete,
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handleUpload = async () => {
    fileUploader.uploadFile({
      file: newFile,
      temporaryId: Date.now().toString(),
    });
  };

  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      {/* Display the file selector button */}
      <FileDropzone fileUploader={fileUploader} accept={['image/*']} fileCategory="USER_FILES" />{' '}
      {/* Images can be previewed using the previews property of the file uploader object */}
      {newFile ? <Image mb={5} w={'350px'} borderRadius={5} src={fileUploader.previews?.[0]?.url} /> : <></>}
      {newFile ? (
        <Button bgColor={'cyan.500'} color="white" disabled={!newFile} onClick={handleUpload} w="fit-content">
          Start upload
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
}
