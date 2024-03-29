import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";
import { Modal } from "react-bootstrap";

async function Deletar(_id) {
  const data = { _id };
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");
  await api.put("./pedidoCliente", data, {}).then(
    await api.delete(`./clienteId/${_id}`, {
      headers: { tokenAutAdmin }
    })
  );
}

async function DeletarAdministrador(id) {
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");
  await api.delete(`./AdministradorId/${id}`, {
    headers: { tokenAutAdmin }
  });
}

async function mostrarCliente(setCliente) {
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");
  const response = await api.get("./cliente", {
    headers: { tokenAutAdmin }
  });
  setCliente(response.data);
}

async function mostrarAdministrador(setAdministrador) {
  const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");
  const response = await api.get("./Administrador", {
    headers: { tokenAutAdmin }
  });
  setAdministrador(response.data);
}

export default function Cliente() {
  const [clientes, setCliente] = useState([]);
  const [administradores, setAdministrador] = useState([]);

  useEffect(() => {
    mostrarCliente(setCliente);
    mostrarAdministrador(setAdministrador);
  }, []);

  const deletadoSucesso = useCallback(
    _id => {
      const novosClientes = clientes.filter(cliente => _id !== cliente._id);
      setCliente(novosClientes);
    },
    [clientes]
  );

  const deletadoSucessoAdministrador = useCallback(
    _id => {
      const novosAdministradores = administradores.filter(
        administrador => _id !== administrador._id
      );
      setAdministrador(novosAdministradores);
    },
    [administradores]
  );

  return (
    <>
      <h1 className="center">CLIENTES</h1>
      <ul className="cliente-list">
        {clientes.map(cliente => {
          return (
            <ClienteItem
              key={cliente._id}
              {...cliente}
              deletadoSucesso={deletadoSucesso}
            />
          );
        })}
      </ul>
      <br />
      <br />
      <Link to="/CadEndereco">
        <button className="btn">Cadastrar novo Usuário</button>
      </Link>
      <br />
      <br />
      <br />
      <br />
      <h1 className="center">ADMINISTRADORES</h1>
      <ul className="cliente-list">
        {administradores.map(administrador => {
          return (
            <AdministradorItem
              key={administrador._id}
              {...administrador}
              deletadoSucessoAdministrador={deletadoSucessoAdministrador}
            />
          );
        })}
      </ul>
      <br />
      <br />
      <Link to="/CadAdministrador">
        <button className="btn">Cadastrar novo Administrador</button>
      </Link>
    </>
  );
}

function AdministradorItem(administrador) {
  const [modal, setModal] = useState(false);
  const deletar = useCallback(async () => {
    await DeletarAdministrador(administrador._id);
    administrador.deletadoSucessoAdministrador(administrador._id);
  }, [administrador]);

  return (
    <>
      <li key={administrador._id}>
        <span text-align="justify">Nome: {administrador.nome}</span>
        <br />
        <span>Email: {administrador.email}</span>
        <br />
        <span>Telefone: {administrador.telefone}</span>
        <br />
        <button className="btn" onClick={() => setModal(true)}>
          Deletar Administrador
        </button>
        <br />
        <br />
        <Link to={`/EdAdministrador/${administrador._id}`}>
          <button className="btn">Editar Administrador</button>
        </Link>
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja deletar o administrador ?</p>
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

function ClienteItem(cliente) {
  const [modal, setModal] = useState(false);
  const deletar = useCallback(async () => {
    await Deletar(cliente._id);
    cliente.deletadoSucesso(cliente._id);
  }, [cliente]);

  return (
    <>
      <li key={cliente._id}>
        <span text-align="center">Nome: {cliente.nome}</span>
        <br />
        <span>Email: {cliente.email}</span>
        <br />
        <span>Telefone: {cliente.telefone}</span>
        <br />
        <span>
          Endereço: {cliente.endereco.rua} - {cliente.endereco.numero}
        </span>
        <br />
        <span>CEP: {cliente.endereco.cep}</span>
        <button className="btn" onClick={() => setModal(true)}>
          Deletar Usuário
        </button>
        <br />
        <br />
        <Link to={`/EdCliente/${cliente._id}/${cliente.endereco}`}>
          <button className="btn">Editar Usuário</button>
        </Link>
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja deletar o usuário ?</p>
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
