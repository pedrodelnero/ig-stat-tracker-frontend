import React from 'react';
import {
  Button,
  HStack,
  IconButton,
  Text,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { isLoggedIn } from '../../utils/isLoggedIn';
import { logOutUser } from '../../actions/users';

const bgColor = { light: 'gray.200', dark: 'gray.600' };

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogOut = async (e) => {
    const data = await logOutUser();
    if (!data.success) {
      console.log({ title: data.message });
    } else {
      window.location.reload();
    }
  };

  return (
    <Flex
      bg={bgColor.colorMode}
      boxShadow="md"
      p={2}
      mb={8}
      justify="space-between"
      align="center"
    >
      <Text ml={4} fontSize="3xl">
        IG Stats for Proposal
      </Text>

      <HStack mr={10} spacing={10}>
        {isLoggedIn() && (
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        )}
        <IconButton
          rounded="round"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        />
      </HStack>
    </Flex>
  );
};

export default NavBar;
