import { Heading, Avatar, Box, Text, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface UserProfileProps {
  id: string;
  reference: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
}

export default function UserProfile({ firstName, lastName, avatarUrl, id }: UserProfileProps) {
  const router = useRouter();
  let userName = 'Anonymous';
  if (firstName || lastName) {
    userName = `${firstName} ${lastName}`;
  }

  const handleChat = async () => {
    const result = await fetch(`/api/chat/user/${id}`, { method: 'POST' });
    const data = await result.json();
    router.push(`/chat?${data.createConversation?.id}`);
  };

  return (
    <Box
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        src={avatarUrl}
        name={userName}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {userName}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        @{id.split('-')[0]}
      </Text>

      <Flex mt={8} justifyContent={'center'}>
        <Button
          fontSize={'sm'}
          rounded={'full'}
          bg={'cyan.400'}
          color={'white'}
          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
          _hover={{
            bg: 'cyan.600',
          }}
          _focus={{
            bg: 'cyan.600',
          }}
          onClick={handleChat}
        >
          Message
        </Button>
      </Flex>
    </Box>
  );
}
