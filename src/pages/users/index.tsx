import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Center } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { AccessInfo } from 'components/access-info';

function UserListPage() {
  const { data, error, isLoading } = useSWR<UserInterface[]>(
    () => '/users',
    () => getUsers(),
  );
  const router = useRouter();
  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <AccessInfo />
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            User
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr cursor="pointer" onClick={() => router.push(`/users/view/${record.id}`)} key={record.id}>
                    <Td>{record.email}</Td>
                    <Td>{record.firstName}</Td>
                    <Td>{record.lastName}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user',
  operation: AccessOperationEnum.READ,
})(UserListPage);
