import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { SignUp, IgProposal } from "../components";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route exact path="/" component={IgProposal} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
