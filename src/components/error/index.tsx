import { Alert, AlertIcon } from '@chakra-ui/react';

interface ErrorPropsInterface {
  error: Error;
}

export function Error({ error }: ErrorPropsInterface) {
  return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );
}
