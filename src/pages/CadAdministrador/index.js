import React, { useState } from "react";
import api from "../../services/api";

export default function New({ history }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      nome,
      cpf,
      telefone,
      sexo,
      email,
      dataNascimento,
      senha
    };

    const endereco_id = localStorage.getItem("endereco");

    await api.post("./Administrador", data, {
      headers: { endereco_id }
    });

    history.push("./Cliente");
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
      <label htmlFor="cpf"> CPF </label>
      <input
        type="cpf"
        id="cpf"
        placeholder="Digite o Número do seu CPF"
        value={cpf}
        onChange={event => setCpf(event.target.value)}
      />
      <label htmlFor="telefone">Telefone</label>
      <input
        id="telefone"
        placeholder="Digite seu Telefone"
        value={telefone}
        onChange={event => setTelefone(event.target.value)}
      />
      <label htmlFor="sexo">Sexo</label>
      <input
        id="sexo"
        placeholder="Sexo"
        value={sexo}
        onChange={event => setSexo(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <label htmlFor="dataNascimento">Data de Nascimento</label>
      <input
        type="date"
        id="dataNascimento"
        placeholder="Coloque sua Data de Nascimento"
        value={dataNascimento}
        onChange={event => setDataNascimento(event.target.value)}
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
        Cadastrar
      </button>
    </form>
  );
}