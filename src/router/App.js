import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Flex, ChakraProvider } from '@chakra-ui/react';

import { NavBar, SignUp, IgProposal } from '../components';

const App = () => {
  return (
    <ChakraProvider>
      <NavBar />
      <Flex w="100%" h="93vh">
        <Router>
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route exact path="/" component={IgProposal} />
          </Switch>
        </Router>
      </Flex>
    </ChakraProvider>
  );
};
export default App;
