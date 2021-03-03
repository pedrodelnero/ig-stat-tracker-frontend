import React from 'react';
import { Box, IconButton, Text, useColorMode, Flex } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'gray.200', dark: 'gray.600' };

  return (
    <Flex
      bg={bgColor.colorMode}
      boxShadow="md"
      p={2}
      mb={8}
      justify="space-between"
      align="center"
      border="1px solid red"
    >
      <Text ml={4} fontSize="3xl">
        IG Stats for Proposal
      </Text>

      <Box mr={7} border="1px solid blue">
        <IconButton
          rounded="full"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        >
          Change Color Mode
        </IconButton>
      </Box>
    </Flex>
  );
};

export default NavBar;
