import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Details from "./components/Details/Details";
import { Provider } from "react-redux";
import store from "./state-management/store/store";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
