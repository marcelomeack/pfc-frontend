import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import { Modal, Dropdown, DropdownButton } from "react-bootstrap";
import moment from "moment";

async function Deletar(id) {
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");

  await api.delete(`./pedidoId/${id}`, {
    headers: { tokenAutAdmin }
  });
}

async function mostrarPedido(setPedidos) {
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");
  const response = await api.get("./pedido", {
    headers: { tokenAutAdmin }
  });
  setPedidos(response.data);
}

export default function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    mostrarPedido(setPedidos);
  }, []);

  const deletadoSucesso = useCallback(
    _id => {
      const novosPedidos = pedidos.filter(pedido => _id !== pedido._id);
      setPedidos(novosPedidos);
    },
    [pedidos]
  );

  const atualizadoSucesso = useCallback(
    statusPedido => {
      const novosPedidos = pedidos.filter(
        pedido => statusPedido !== pedido.statusPedido
      );
      setPedidos(novosPedidos);
    },
    [pedidos]
  );

  return (
    <>
      <ul className="produto-list">
        {pedidos.map((pedido, itemPedido) => {
          return (
            <ProdutoItem
              key={pedido._id}
              {...pedido}
              deletadoSucesso={deletadoSucesso}
              atualizadoSucesso={atualizadoSucesso}
            />
          );
        })}
      </ul>
    </>
  );
}

function ProdutoItem(pedido, itemPedidos) {
  const [modal, setModal] = useState(false);
  const deletar = useCallback(async () => {
    await Deletar(pedido._id);
    pedido.deletadoSucesso(pedido._id);
  }, [pedido]);

  const [statusPedido, setStatusPedido] = useState("");
  const handleSelect = e => {
    console.log(e);
    setStatusPedido(e);
  };

  async function atualizarStatus(_id, statusPedido) {
    const data = {
      _id,
      statusPedido
    };

    await api.put("./pedidoStatus", data, {});

    // pedido.atualizadoSucesso(pedido.statusPedido);
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
        <span>Comprador:{pedido.cliente.nome}</span>
        <br />
        <span>Email: {pedido.cliente.email}</span>
        <br />
        <span>Telefone: {pedido.cliente.telefone}</span>
        <br />
        <span>Valor Pedido: R${pedido.valorTotal.toFixed(2)}</span>
        <br />
        <span>
          Data e Hora do Pedido:{" "}
          {moment(pedido.dataPedido).format("DD/MM/YYYY - hh:mm:ss")}
        </span>
        <br />
        <span>Endereço de Entrega: {pedido.enderecoEntrega}</span>
        <br />
        <span>CEP: {pedido.CEP}</span>
        <br />
        <span>Status Pedido: {pedido.statusPedido}</span>
        <button className="btn" onClick={() => setModal(true)}>
          Deletar Pedido
        </button>
        <br />
        <br />
        <DropdownButton
          alignRight
          title="Atualizar Status"
          onSelect={(eventKey, event) => {
            handleSelect(eventKey, event);
            atualizarStatus(pedido._id, eventKey);
          }}
        >
          <Dropdown.Item eventKey="Pedido Enviado">
            Pedido Enviado
          </Dropdown.Item>
          <Dropdown.Item eventKey="Pedido Recebido">
            Pedido Recebido
          </Dropdown.Item>
        </DropdownButton>
        <br />
        <br />
      </li>

      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja deletar o pedido ?</p>
          <button className="btnm" onClick={deletar}>
            Sim
          </button>
          <button className="btnm" onClick={() => setModal(false)}>
            Não
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
