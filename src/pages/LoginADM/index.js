import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/sessaoADM", {
      email,
      senha
    });
    const tokenAut = response.data;
    localStorage.setItem("Token", tokenAut);
    history.push("./produto");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="digite seu e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          placeholder="digite sua senha"
          value={senha}
          onChange={event => setSenha(event.target.value)}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
        <br />
      </form>
    </>
  );
}
