import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function New({ history, match }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");

    let _id = match.params._id;

    const editar = {
      nome,
      descricao,
      valor,
      quantidade
    };
    await api.put(`./produto/${_id}`, editar, {
      headers: { tokenAutAdmin }
    });

    history.push("/Produto");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome do Produto</label>
      <input
        id="nome"
        placeholder="Digite o Nome do Produto"
        value={nome}
        required
        onChange={event => setNome(event.target.value)}
      />
      <label htmlFor="descricao">Descrição do Produto</label>
      <input
        id="descricao"
        placeholder="Digite a Descrição do Produto"
        value={descricao}
        required
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
      <label htmlFor="quantidade">Quantidade de Produtos</label>
      <input
        id="quantidade"
        placeholder="Digite a Quantidade do Produto"
        value={quantidade}
        required
        onChange={event => setQuantidade(event.target.value)}
      />
      <button className="btn" type="submit">
        Atualizar Produto
      </button>
    </form>
  );
}
