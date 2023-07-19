import { Chat, requireNextAuth } from '@roq/nextjs';
import { useRouter } from 'next/router';
import AppLayout from 'layout/app-layout';
import { Box } from '@chakra-ui/react';

function ChatPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Box w="100%" h="80vh">
        <Chat fluid={true} />
      </Box>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: '/',
})(ChatPage);
