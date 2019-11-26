import React, { useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/sessao", {
      email,
      senha
    });
    const tokenAut = response.data;
    localStorage.setItem("clienteToken", tokenAut);
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
        <Link to="./CadEndereco">
          <button className="btn">Cadastrar-se</button>
        </Link>
      </form>
    </>
  );
}
