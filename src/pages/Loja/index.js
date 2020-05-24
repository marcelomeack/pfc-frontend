import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import { Modal } from "react-bootstrap";
import "./styles.css";

async function mostrarProduto(setProduto) {
  const response = await api.get("./produtoLoja", {});
  setProduto(response.data);
}

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    mostrarProduto(setProdutos);
  }, []);

  return (
    <>
      <ul className="produto-list">
        {produtos.map(produto => {
          return <ProdutoItem key={produto._id} {...produto} />;
        })}
      </ul>
    </>
  );
}

function ProdutoItem(produto) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <li key={produto._id}>
        <header style={{ backgroundImage: `url(${produto.thumbnail_url})` }} />
        <strong>{produto.nome}</strong>
        <br />
        <span text-align="justify">{produto.descricao}</span>
        <br />
        <span>{produto.valor ? `R$: ${produto.valor}` : `GRATUITO`}</span>
        <br />
        <button className="lojabtn" onClick={() => setModal(true)}>
          Adicionar ao Carrinho
        </button>
        <br />
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja adicionar o produto ao carrinho ?</p>
          <button className="btnm">Sim</button>
          <button className="btnm" onClick={() => setModal(false)}>
            Não
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
