import AppLayout from 'layout/app-layout';
import { UserProfile } from '@roq/nextjs';
import { Box } from '@chakra-ui/react';

export default function ProfilePage() {
  return (
    <AppLayout>
      <Box w={{ base: '100%', md: '70%', lg: '70%', xl: '50%' }}>
        <UserProfile />
      </Box>
    </AppLayout>
  );
}
