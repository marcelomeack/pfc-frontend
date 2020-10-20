import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Dropdown, DropdownButton } from "react-bootstrap";

async function mostrarPedido(setPedidos) {
  const tokenAut = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("User"));
  const { _id } = user;
  const response = await api.get("./pedidoCliente", {
    headers: { _id, tokenAut }
  });
  setPedidos(response.data);
}

export default function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    mostrarPedido(setPedidos);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Pedidos</h1>
      <br />
      <br />
      <ul className="produto-list">
        {pedidos.map(pedido => {
          return <ProdutoItem key={pedido._id} {...pedido} />;
        })}
      </ul>
    </>
  );
}

function ProdutoItem(pedido) {
  const [statusPedido, setStatusPedido] = useState("");
  const handleSelect = e => {
    setStatusPedido(e);
  };

  async function atualizarStatus(_id, statusPedido) {
    const data = {
      _id,
      statusPedido
    };

    await api.put("./pedidoStatus", data, {});
  }

  function renderComp() {
    if (pedido.statusPedido === "Pedido Enviado") {
      return (
        <DropdownButton
          alignRight
          title="Atualizar Status"
          onSelect={(eventKey, event) => {
            handleSelect(eventKey, event);
            atualizarStatus(pedido._id, eventKey);
          }}
        >
          <Dropdown.Item eventKey="Pedido Recebido">
            Pedido Recebido
          </Dropdown.Item>
        </DropdownButton>
      );
    } else {
      return;
    }
  }
  return (
    <>
      <li>
        {pedido.itemPedidos.map(itemPedido => {
          return (
            <>
              <div
                className="teste"
                style={{
                  backgroundImage: `url(${itemPedido.thumbnail_url})`
                }}
              ></div>
              <span>Produto: {itemPedido.nome}</span>
              <br />
              <span>Quantidade: {itemPedido.quantidade}</span>
              <br />
              <span>Valor: {itemPedido.valor.toFixed(2)}</span>
              <br />
            </>
          );
        })}
        <br />
        <span>Valor Pedido: R${pedido.valorTotal.toFixed(2)}</span>
        <br />
        <span>Data Pedido: {pedido.dataPedido}</span>
        <br />
        <span>Endereço de Entrega: {pedido.enderecoEntrega}</span>
        <br />
        <span>CEP: {pedido.CEP}</span>
        <br />
        <span>Status Pedido: {pedido.statusPedido}</span>
        <br />
        <br />
        {renderComp()}
        <br />
        <br />
      </li>
    </>
  );
}
