import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Error } from '../error';
import get from 'lodash/get';

interface AsyncSelectPropsInterface<T> {
  formik: any;
  name: string;
  label: string;
  placeholder: string;
  fetcher: () => Promise<T[]>;
  renderOption: (record: T) => JSX.Element;
}

export function AsyncSelect<T>({
  formik,
  name,
  label,
  placeholder,
  fetcher,
  renderOption,
}: AsyncSelectPropsInterface<T>) {
  const { data, error, isLoading } = useSWR<T[]>(name, () => fetcher());
  useEffect(() => {
    if (data && data.length === 1 && !get(formik.values, name)) {
      formik.setFieldValue(name, (data[0] as any).id);
    }
  }, [data]);
  return (
    <>
      {error && <Error error={error} />}
      <FormControl id={name} mb="4" isInvalid={!!get(formik.errors, name)}>
        <FormLabel>{label}</FormLabel>
        <Select
          placeholder={placeholder}
          name={name}
          value={get(formik.values, name) ?? ''}
          onChange={formik.handleChange}
        >
          {data?.map((record) => renderOption(record))}
        </Select>
        {get(formik.errors, name) && <FormErrorMessage>{get(formik.errors, name)}</FormErrorMessage>}
      </FormControl>
    </>
  );
}
