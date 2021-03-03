import React, { useState } from 'react';
import axios from 'axios';
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

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.600' };
  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      window.location.href = '/';
    } catch (err) {
      console.log(`Error1: ${err}`);
      setError({ title: err.response.data });
    }
  };
  return (
    <>
      {error && <Error error={error} />}
      <form onSubmit={handleLogin}>
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

          <Button
            type="submit"
            boxShadow="sm"
            colorScheme="teal"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
