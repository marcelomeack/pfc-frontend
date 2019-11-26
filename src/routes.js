import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import CadProduto from "./pages/CadProduto";
import Produto from "./pages/Produto";
import EdProduto from "./pages/EdProduto";
import CadEndereco from "./pages/CadEndereco";
import CadCliente from "./pages/CadCliente";
import EdCliente from "./pages/EdCliente";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={New} />
        <Route path="/CadProduto" exact component={CadProduto} />
        <Route path="/Produto" exact component={Produto} />
        <Route path="/EdProduto/:_id" exact component={EdProduto} />
        <Route path="/CadEndereco" exact component={CadEndereco} />
        <Route path="/CadCliente" exact component={CadCliente} />
        <Route path="/EdCliente/:_id" exact component={EdCliente} />
      </Switch>
    </BrowserRouter>
  );
}
