import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/api";
import { Modal } from "react-bootstrap";
import { adicionarProduto } from "../../store/ducks/carrinho";
import { Link } from "react-router-dom";
import "../Loja/styles.css";

async function mostrarProduto(setProduto) {
  const response = await api.get("./produtoLoja", {});
  setProduto(response.data);
}

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const length = useSelector(state => state.carrinho.length);
  localStorage.setItem("produtoQt", JSON.stringify(produtos));

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
      <Link to="/Carrinho">
        <button className="btn">Carrinho {length}</button>
      </Link>
    </>
  );
}

function ProdutoItem(produto) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <li key={produto._id}>
        <header style={{ backgroundImage: `url(${produto.thumbnail_url})` }} />
        <strong>{produto.nome}</strong>
        <br />
        <span text-align="justify">{produto.descricao}</span>
        <br />
        <span>
          {produto.valor ? `R$: ${produto.valor.toFixed(2)}` : `GRATUITO`}
        </span>
        <br />
        <button className="lojabtn" onClick={() => setModal(true)}>
          Adicionar ao Carrinho
        </button>
        <br />
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja adicionar o produto ao carrinho ?</p>
          <button
            className="btnm"
            onClick={() => {
              dispatch(adicionarProduto(produto));
              setModal(false);
            }}
          >
            Sim
          </button>
          <button className="btnm" onClick={() => setModal(false)}>
            Não
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
