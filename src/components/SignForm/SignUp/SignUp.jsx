import React, { useState } from 'react';
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  useColorMode,
} from '@chakra-ui/react';
import { InfoIcon, LockIcon } from '@chakra-ui/icons';

import Error from '../../Error/Error';
import { createUser } from '../../../actions/users';

const bgColor = { light: 'white', dark: 'gray.600' };

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { colorMode } = useColorMode();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const data = await createUser(username, password, confirmPassword);

    if (!data.success) {
      setError({ title: data.message });
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      <form onSubmit={handleSignUp}>
        <Stack spacing={3} mt={3}>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<InfoIcon />} />
              <Input
                bg={bgColor[colorMode]}
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<LockIcon />} />
              <Input
                bg={bgColor[colorMode]}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<LockIcon />} />
              <Input
                bg={bgColor[colorMode]}
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            boxShadow="sm"
            colorScheme="teal"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
