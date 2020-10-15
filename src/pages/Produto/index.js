import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";
import { Modal } from "react-bootstrap";
import "./styles.css";
import { saveAs } from "file-saver";

async function Deletar(id) {
  await api.delete(`./produtoId/${id}`);
}

async function mostrarProduto(setProduto) {
  const tokenAut = localStorage.getItem("Token");
  const response = await api.get("./produto", {
    headers: { tokenAut }
  });
  setProduto(response.data);
}

async function pdf() {
  await api.post("./relatorioFaturamento");
  await api
    .get("./getRelatorioFaturamento", { responseType: "blob" })
    .then(res => {
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });

      saveAs(pdfBlob, "faturamentoPdf.pdf");
    });
}

async function pdfProduto() {
  await api.post("./relatorioRank");
  await api.get("./getRelatorioRank", { responseType: "blob" }).then(res => {
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });

    saveAs(pdfBlob, "faturamentoPdf.pdf");
  });
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
      <br />
      <br />
      <button className="btn" onClick={pdf}>
        Relatório Faturamento
      </button>
      <br />
      <br />
      <button className="btn" onClick={pdfProduto}>
        Produtos Mais vendidos
      </button>
      <br />
      <br />
      <Link to="/Cliente">
        <button className="button indigo"> Usuários </button>
      </Link>
      <Link to="/Pedidos">
        <button className="button indigo"> Pedidos </button>
      </Link>
    </>
  );
}

function ProdutoItem(produto) {
  const [modal, setModal] = useState(false);
  const deletar = useCallback(async () => {
    await Deletar(produto._id);
    produto.deletadoSucesso(produto._id);
  }, [produto]);

  return (
    <>
      <li key={produto._id}>
        <header style={{ backgroundImage: `url(${produto.thumbnail_url})` }} />
        <strong>{produto.nome}</strong>
        <br />
        <span text-align="justify">{produto.descricao}</span>
        <br />
        <span
          text-align="justify"
          style={produto.quantidade <= 3 ? { color: "red" } : { color: "none" }}
        >
          Quantidade: {produto.quantidade}
        </span>
        <br />
        <span>{produto.valor ? `R$: ${produto.valor}` : `GRATUITO`}</span>
        <button className="btn" onClick={() => setModal(true)}>
          Deletar Produto
        </button>
        <br />
        <br />
        <Link to={`/EdProduto/${produto._id}`}>
          <button className="btn">Editar Produto</button>
        </Link>
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja deletar o produto ?</p>
          <button className="btnm" onClick={deletar}>
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

// {modal ? "s" : "n"} TESTE TERNARIO
