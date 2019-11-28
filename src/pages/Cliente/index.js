import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

async function Deletar(id) {
  await api.delete(`./clienteId/${id}`);
}

async function mostrarCliente(setCliente) {
  const tokenAut = localStorage.getItem("Token");
  const response = await api.get("./cliente", {
    headers: { tokenAut }
  });
  setCliente(response.data);
}

export default function Cliente() {
  const [clientes, setCliente] = useState([]);
  useEffect(() => {
    mostrarCliente(setCliente);
  }, []);

  const deletadoSucesso = useCallback(
    _id => {
      const novosClientes = clientes.filter(cliente => _id !== cliente._id);
      setCliente(novosClientes);
    },
    [clientes]
  );

  return (
    <>
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
      <Link to="/CadEndereco">
        <button className="btn">Cadastrar novo Usuário</button>
      </Link>
    </>
  );
}

function ClienteItem(cliente) {
  const deletar = useCallback(async () => {
    await Deletar(cliente._id);
    cliente.deletadoSucesso(cliente._id);
  }, [cliente]);

  return (
    <li key={cliente._id}>
      <span text-align="justify">{cliente.nome}</span>
      <br />
      <span>{cliente.email}</span>
      <button className="btn" onClick={deletar}>
        Deletar Cliente
      </button>
      <br />
      <br />
      <Link to={`/EdCliente/${cliente._id}`}>
        <button className="btn">Editar Cliente</button>
      </Link>
    </li>
  );
}
