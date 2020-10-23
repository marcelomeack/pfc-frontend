import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import Login from "./pages/Login";
import CadProduto from "./pages/CadProduto";
import Produto from "./pages/Produto";
import EdProduto from "./pages/EdProduto";
import EdAdministrador from "./pages/EdAdministrador";
import CadEndereco from "./pages/CadEndereco";
import CadCliente from "./pages/CadCliente";
import CadAdministrador from "./pages/CadAdministrador";
import EdCliente from "./pages/EdCliente";
import Cliente from "./pages/Cliente";
import Loja from "./pages/Loja";
import Carrinho from "./pages/Carrinho";
import Pedidos from "./pages/Pedidos";
import LoginADM from "./pages/LoginADM";
import PedidoCliente from "./pages/PedidoCliente";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Adm" exact component={LoginADM} />
          <Route path="/Loja" exact component={Loja} />
          <Route path="/CadProduto" exact component={CadProduto} />
          <Route path="/Produto" exact component={Produto} />
          <Route path="/EdProduto/:_id" exact component={EdProduto} />
          <Route path="/CadEndereco" exact component={CadEndereco} />
          <Route path="/CadCliente" exact component={CadCliente} />
          <Route path="/CadAdministrador" exact component={CadAdministrador} />
          <Route path="/EdCliente/:_id/:endereco" exact component={EdCliente} />
          <Route
            path="/EdAdministrador/:_id"
            exact
            component={EdAdministrador}
          />
          <Route path="/Cliente" exact component={Cliente} />
          <Route path="/Carrinho" exact component={Carrinho} />
          <Route path="/Pedidos" exact component={Pedidos} />
          <Route path="/PedidoCliente" exact component={PedidoCliente} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
