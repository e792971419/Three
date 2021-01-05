/*
 * @Author: your name
 * @LastEditors: xiasong
 * @Date: 2020-09-28 10:03:05
 * @LastEditTime: 2021-01-05 14:22:51
 * @Description: description
 * @FilePath: \myreact\src\App.js
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from "./pages";
import Three from "./pages/Three";

const App = () => {
  return (
    <Router>
      <ul style={{ display: "flex" }}>
        <li>
          <Link to="/">demo </Link>
        </li>
        <li>
          <Link to="/three">three.js </Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Box />
        </Route>
        <Route path="/three">
          <Three />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
