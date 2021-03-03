import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Flex, ChakraProvider } from '@chakra-ui/react';

import { NavBar, SignForm, IgProposal } from '../components';
import { PrivateRoute, PublicRoute } from './index';

const App = () => {
  return (
    <ChakraProvider>
      <NavBar />
      <Flex w="100%" h="93vh" justify="center">
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={IgProposal} />
            <PublicRoute exact path="/signin" component={SignForm} />
          </Switch>
        </Router>
      </Flex>
    </ChakraProvider>
  );
};
export default App;
