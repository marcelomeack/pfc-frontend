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

    const user = await api.get("/clienteId", {
      headers: { email }
    });

    const tokenAut = response.data;
    const usuario = JSON.stringify(user.data);
    localStorage.setItem("Token", tokenAut);
    localStorage.setItem("User", usuario);
    history.push("./loja");
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
        <br />
        <Link to="./Adm">
          <button className="btn">Administrador</button>
        </Link>
      </form>
    </>
  );
}
