import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import CadProduto from "./pages/CadProduto";
import Produto from "./pages/Produto";
import EdProduto from "./pages/EdProduto";
import CadEndereco from "./pages/CadEndereco";
import CadCliente from "./pages/CadCliente";
import EdCliente from "./pages/EdCliente";
import Cliente from "./pages/Cliente";
import Loja from "./pages/Loja";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Loja" exact component={Loja} />
        <Route path="/CadProduto" exact component={CadProduto} />
        <Route path="/Produto" exact component={Produto} />
        <Route path="/EdProduto/:_id" exact component={EdProduto} />
        <Route path="/CadEndereco" exact component={CadEndereco} />
        <Route path="/CadCliente" exact component={CadCliente} />
        <Route path="/EdCliente/:_id/:endereco" exact component={EdCliente} />
        <Route path="/Cliente" exact component={Cliente} />
      </Switch>
    </BrowserRouter>
  );
}
