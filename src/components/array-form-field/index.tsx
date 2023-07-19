import { ChangeEventHandler, useState } from 'react';
import { Box, Button, Flex, Text, SimpleGrid } from '@chakra-ui/react';

interface ArrayFormField {
  properties: { fieldName: string; label: string }[];
  errors: any;
  name: string;
  title: string;
  values: any;
  rowInitialValues: any;
  setFieldValue: Function;
  renderRowField(arg: { value: any; name: string; fieldName: string; label: string; error?: string }): JSX.Element;
}

export function ArrayFormField({
  values,
  rowInitialValues,
  setFieldValue,
  properties,
  title,
  name,
  renderRowField,
  errors,
}: ArrayFormField) {
  const handleRemove = (index: number) => {
    const newCategories = [...values];
    newCategories.splice(index, 1);
    setFieldValue(name, newCategories);
  };

  const handleAdd = () => {
    const newCategories = [...values, rowInitialValues];
    setFieldValue(name, newCategories);
  };
  return (
    <Box mb={4} p={4} border="1px" borderColor="gray.200">
      <Text mb={4}>{title}</Text>
      {values.map((_: any, index: number) => (
        <Flex key={index} mb={4} alignItems={{ base: 'center', sm: 'center,', md: 'center', lg: 'start' }}>
          <SimpleGrid minHeight="113px" columns={{ base: 1, sm: 1, md: 2, lg: 4 }} gap={4}>
            {properties.map((property) => (
              <Box key={`${name}.${index}.${property.fieldName}`}>
                {renderRowField({
                  ...property,
                  name: `${name}.${index}.${property.fieldName}`,
                  value: values?.[index]?.[property.fieldName],
                  error: errors?.[index]?.[property.fieldName],
                })}
              </Box>
            ))}
          </SimpleGrid>
          <Button ml={10} mt={8} p={4} onClick={() => handleRemove(index)}>
            Remove
          </Button>
        </Flex>
      ))}
      <Button mt={8} ml={10} onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
}
