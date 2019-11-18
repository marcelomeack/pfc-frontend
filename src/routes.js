import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import CadProduto from "./pages/CadProduto";
import Produto from "./pages/Produto";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={New} />
        <Route path="/CadProduto" exact component={CadProduto} />
        <Route path="/Produto" exact component={Produto} />
      </Switch>
    </BrowserRouter>
  );
}
