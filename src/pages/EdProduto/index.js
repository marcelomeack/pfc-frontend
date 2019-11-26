import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function New({ history, match }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    let _id = match.params._id;

    const editar = {
      nome,
      descricao,
      valor
    };
    await api.put(`./produto/${_id}`, editar, {});

    history.push("/Produto");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome do Produto</label>
      <input
        id="nome"
        placeholder="Digite o Nome do Produto"
        value={nome}
        onChange={event => setNome(event.target.value)}
      />
      <label htmlFor="descricao">Descrição do Produto</label>
      <input
        id="descricao"
        placeholder="Digite a Descrição do Produto"
        value={descricao}
        onChange={event => setDescricao(event.target.value)}
      />
      <label htmlFor="valor">
        Valor do Produto <span>(embranco para Gratuito)</span>
      </label>
      <input
        id="valor"
        placeholder="Digite o Valor do Produto"
        value={valor}
        onChange={event => setValor(event.target.value)}
      />
      <button className="btn" type="submit">
        Atualizar Produto
      </button>
    </form>
  );
}
