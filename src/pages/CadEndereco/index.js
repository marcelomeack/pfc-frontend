import React, { useState } from "react";
import api from "../../services/api";

export default function New({ history }) {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      rua,
      numero,
      complemento,
      cep,
      bairro
    };

    const response = await api.post("./endereco", data, {});
    const { _id } = response.data;

    localStorage.setItem("endereco", _id);

    history.push("./CadCliente");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rua"> Rua </label>
      <input
        id="rua"
        placeholder="Digite a sua Rua"
        value={rua}
        onChange={event => setRua(event.target.value)}
      />
      <label htmlFor="numero">Número do Endereço</label>
      <input
        id="numero"
        placeholder="Digite o Número do Endereço"
        value={numero}
        onChange={event => setNumero(event.target.value)}
      />
      <label htmlFor="complemento">Complemento</label>
      <input
        id="complemento"
        placeholder="Digite o Complemento"
        value={complemento}
        onChange={event => setComplemento(event.target.value)}
      />
      <label htmlFor="cep">CEP</label>
      <input
        id="cep"
        type="zip-code"
        placeholder="Digite o CEP (XXXXX-XXX)"
        value={cep}
        onChange={event => setCep(event.target.value)}
      />
      <label htmlFor="bairro">Bairro</label>
      <input
        id="bairro"
        placeholder="Digite o seu Bairro"
        value={bairro}
        onChange={event => setBairro(event.target.value)}
      />
      <button className="btn" type="submit">
        Cadastrar Endereço
      </button>
    </form>
  );
}
