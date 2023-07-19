import { Select, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Error } from '../error';
import { getUsers } from '../../apiSdk/users';
import { UserInterface } from '../../interfaces/user';

interface AsyncSelectPropsInterface {
  name: string;
  value: string;
  handleChange: (value: string) => void;
}

export function UserSelect({ name, value, handleChange }: AsyncSelectPropsInterface) {
  const { data, error } = useSWR<UserInterface[]>(name, () => getUsers());
  useEffect(() => {
    if (data && data.length === 1 && !value) {
      handleChange(data[0].id);
    }
  }, [data]);
  return (
    <>
      {error && <Error error={error} />}
      <Text>Select User</Text>
      <Select placeholder="Select User" name={name} value={value ?? ''} onChange={(e) => handleChange(e.target.value)}>
        {data?.map((record) => (
          <option key={record.id} value={record.id}>
            {record?.email}
          </option>
        ))}
      </Select>
    </>
  );
}
