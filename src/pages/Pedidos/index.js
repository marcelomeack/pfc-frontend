import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import { Modal, Dropdown, DropdownButton } from "react-bootstrap";

async function Deletar(id) {
  await api.delete(`./pedidoId/${id}`);
}

async function mostrarPedido(setPedidos) {
  const tokenAut = localStorage.getItem("Token");
  const response = await api.get("./pedido", {
    headers: { tokenAut }
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
        {/* <header
          style={{
            backgroundImage: `url(${pedido.itemPedidos.thumbnail_url})`
          }}
        /> */}
        <br />
        {pedido.itemPedidos.map(itemPedido => {
          return <span>{itemPedido.nome}</span>;
        })}
        <br />
        <span>Comprador do Pedido:{pedido.nome}</span>
        <br />
        <span>Email: {pedido.email}</span>
        <br />
        <span>Telefone: {pedido.telefone}</span>
        <br />
        <span>Valor Pedido: R${pedido.valorTotal}</span>
        <br />
        <span>Data Pedido: {pedido.dataPedido}</span>
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
