import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

async function Deletar(id) {
  await api.delete(`./produtoId/${id}`);
}

async function mostrarProduto(setProduto) {
  const tokenAut = localStorage.getItem("clienteToken");
  const response = await api.get("./produto", {
    headers: { tokenAut }
  });
  setProduto(response.data);
}

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    mostrarProduto(setProdutos);
  }, []);

  const deletadoSucesso = useCallback(
    _id => {
      const novosProdutos = produtos.filter(produto => _id !== produto._id);
      setProdutos(novosProdutos);
    },
    [produtos]
  );

  return (
    <>
      <ul className="produto-list">
        {produtos.map(produto => {
          return (
            <ProdutoItem
              key={produto._id}
              {...produto}
              deletadoSucesso={deletadoSucesso}
            />
          );
        })}
      </ul>
      <Link to="/CadProduto">
        <button className="btn">Cadastrar novo Produto</button>
      </Link>
    </>
  );
}

function ProdutoItem(produto) {
  const deletar = useCallback(async () => {
    await Deletar(produto._id);
    produto.deletadoSucesso(produto._id);
  }, [produto]);

  return (
    <li key={produto._id}>
      <header style={{ backgroundImage: `url(${produto.thumbnail_url})` }} />
      <strong>{produto.nome}</strong>
      <br />
      <span text-align="justify">{produto.descricao}</span>
      <br />
      <span>{produto.valor ? `R$${produto.valor}` : `GRATUITO`}</span>
      <button className="btn" onClick={deletar}>
        Deletar Produto
      </button>
      <br />
      <br />
      <Link to={`/EdProduto/${produto._id}`}>
        <button className="btn">Editar Produto</button>
      </Link>
    </li>
  );
}
