import { Box, Center, useColorModeValue, Text, Stack, Image, Avatar } from '@chakra-ui/react';
import { UserFile } from 'components/file/types';

export default function FileCard({ file }: { file: UserFile }) {
  const { createdByUser, createdAt, name, url } = file;
  const userName = createdByUser?.firstName || 'Anonymous';
  const createdDate = new Date(createdAt);

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${file.url})`,
            filter: 'blur(30px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={url} />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {name}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={createdByUser.avatarUrl} name={userName} colorScheme="cyan" />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{userName}</Text>
            <Text color={'gray.500'}>
              Uploaded{' '}
              {createdDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
