import React, { useState } from "react";
import api from "../../services/api";

export default function New({ history, match }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");

    let _id = match.params._id;

    const data = {
      nome,
      telefone,
      email,
      senha
    };

    await api.put(`./Administrador/${_id}`, data, {
      headers: { tokenAutAdmin }
    });

    history.push("/Cliente");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome"> Nome </label>
      <input
        id="nome"
        placeholder="Digite seu Nome"
        value={nome}
        onChange={event => setNome(event.target.value)}
      />
      <label htmlFor="telefone">Telefone</label>
      <input
        id="telefone"
        placeholder="Digite seu Telefone"
        value={telefone}
        onChange={event => setTelefone(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        placeholder="Digite sua Senha"
        value={senha}
        onChange={event => setSenha(event.target.value)}
      />
      <button className="btn" type="submit">
        Atualizar
      </button>
    </form>
  );
}
