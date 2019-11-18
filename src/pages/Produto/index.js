import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Dashboard() {
  const [produto, setProduto] = useState([]);
  useEffect(() => {
    async function loadProduto() {
      const produto_id = localStorage.getItem("produto");
      const response = await api.get("./produto", {
        headers: { produto_id }
      });
      setProduto(response.data);
    }
    loadProduto();
  }, []);
  return (
    <>
      <ul className="produto-list">
        {produto.map(produto => (
          <li key={produto._id}>
            <header
              style={{ backgroundImage: `url(${produto.thumbnail_url})` }}
            />
            <strong>{produto.nome}</strong>
            <br />
            <span text-align="justify">{produto.descricao}</span>
            <br />
            <span>{produto.valor ? `R$${produto.valor}/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>
      <Link to="/CadProduto">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
