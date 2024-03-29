import React, { useState, useMemo } from "react";
import api from "../../services/api";
import "./styles.css";
import camera from "../../assets/camera.svg";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function cadastrarProduto(event) {
    event.preventDefault();

    const data = new FormData();

    const tokenAutAdmin = localStorage.getItem("tokenAutAdmin");

    data.append("thumbnail", thumbnail);
    data.append("nome", nome);
    data.append("descricao", descricao);
    data.append("valor", valor);
    data.append("quantidade", quantidade);

    await api.post("./produto", data, {
      headers: { tokenAutAdmin }
    });

    history.push("/Produto");
  }

  return (
    <form onSubmit={cadastrarProduto}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
          required
        />
        <img src={camera} alt="Select img" />
      </label>
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
      <label htmlFor="quantidade">Quantidade do Produto</label>
      <input
        id="quantidade"
        placeholder="Digite a Quantidade do Produto"
        value={quantidade}
        required
        onChange={event => setQuantidade(event.target.value)}
      />
      <button className="btn" type="submit" name="btnCadastrarProduto">
        Cadastrar Produto
      </button>
    </form>
  );
}
