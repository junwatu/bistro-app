import { Flex, Text, Box } from '@chakra-ui/react';
import { useAccessInfo } from 'lib/hooks/use-access-info-text';
import { FiAlertCircle } from 'react-icons/fi';

export const AccessInfo = () => {
  const text = useAccessInfo();
  return (
    <Flex alignItems="center" color="GrayText" mb={4}>
      <Box mr={1}>
        <FiAlertCircle />
      </Box>
      <Text fontSize="sm">{text}</Text>
    </Flex>
  );
};
