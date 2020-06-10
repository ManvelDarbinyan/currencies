import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import "./index.css";
import Details from "./components/Details/Details";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={List} exact />
        <Route path="/currency/:id" component={Details} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
