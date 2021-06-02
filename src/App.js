import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "./api/context";
import Home from "./pages/home";
import SingleVideo from "./pages/singleVideo";
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/watch/:id" component={SingleVideo} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

export default App;
