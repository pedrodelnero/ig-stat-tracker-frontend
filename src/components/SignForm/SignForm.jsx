import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
} from '@chakra-ui/react';

import SignUp from './SignUp/SignUp';
import Login from './Login/Login';

const SignForm = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      w="350px"
      p={3}
      boxShadow="sm"
      rounded="lg"
      //   border="1px solid red"
    >
      <Tabs variant="enclosed-colored" isFitted m={4}>
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Login</Tab>
        </TabList>
        <TabPanels mt={3}>
          <TabPanel>
            <SignUp />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SignForm;
