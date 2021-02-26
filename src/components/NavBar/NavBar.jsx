import React from 'react';
import { Text, useColorMode, Flex } from '@chakra-ui/react';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'gray.100', dark: 'gray.600' };

  return (
    <Flex bg={bgColor[colorMode]} boxShadow="md" p={2} mb={8}>
      <Text fontSize="3xl">IG Stats for Proposal</Text>
    </Flex>
  );
};

export default NavBar;
