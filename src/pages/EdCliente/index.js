import React, { useState } from "react";
import api from "../../services/api";

export default function New({ history, match }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");

    let _id = match.params._id;
    let endereco = match.params.endereco;

    const data = {
      nome,
      cpf,
      telefone,
      sexo,
      email,
      dataNascimento,
      senha
    };

    await api.put(`./cliente/${_id}/${endereco}`, data, {
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
        required
        onChange={event => setNome(event.target.value)}
      />
      <label htmlFor="cpf"> CPF </label>
      <input
        type="cpf"
        id="cpf"
        placeholder="Digite o Número do seu CPF"
        value={cpf}
        required
        onChange={event => setCpf(event.target.value)}
      />
      <label htmlFor="telefone">Telefone</label>
      <input
        id="telefone"
        placeholder="Digite seu Telefone"
        value={telefone}
        required
        onChange={event => setTelefone(event.target.value)}
      />
      <label htmlFor="sexo">Sexo</label>
      <input
        id="sexo"
        placeholder="Sexo"
        value={sexo}
        required
        onChange={event => setSexo(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        value={email}
        required
        onChange={event => setEmail(event.target.value)}
      />
      <label htmlFor="dataNascimento">Data de Nascimento</label>
      <input
        type="date"
        id="dataNascimento"
        placeholder="Coloque sua Data de Nascimento"
        value={dataNascimento}
        required
        onChange={event => setDataNascimento(event.target.value)}
      />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        placeholder="Digite sua Senha"
        value={senha}
        required
        onChange={event => setSenha(event.target.value)}
      />
      <button className="btn" type="submit">
        Atualizar
      </button>
    </form>
  );
}
