import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { SignUp, igProposal } from "../components";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route exact path="/" component={igProposal} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
