import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../Carrinho/styles.css";
import {
  removerProduto,
  adicionarQuantidade,
  removerQuantidade
} from "../../store/ducks/carrinho";
import {
  BsTrashFill,
  BsFillPlusCircleFill,
  BsFillDashCircleFill
} from "react-icons/bs";
import api from "../../services/api";
import moment from "moment";

export default function CarrinhoCompras({ history }) {
  const carrinho = useSelector(state => state.carrinho);
  const total = carrinho.reduce(
    (valorTotal, produto) => valorTotal + produto.valor * produto.quantidade,
    0
  );
  const valortotal = total.toFixed(2);
  const [checkout, setCheckOut] = useState(false);
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [CEP, setCEP] = useState("");
  const user = JSON.parse(localStorage.getItem("User"));
  const { dataNascimento } = user;
  const dataAtual = moment().date();
  const data = moment(dataNascimento, "YYYY-MM-DD").date();

  function PayPal(event) {
    const paypal = useRef();

    async function cadastrarPedido(valorTotal, carrinho) {
      const dataPedido = Date.now();
      const itemPedidos = carrinho;
      const user = JSON.parse(localStorage.getItem("User"));
      const { _id } = user;
      const statusPedido = "Aguardando Postagem";

      const data = {
        dataPedido,
        valorTotal,
        itemPedidos,
        statusPedido,
        cliente: _id,
        enderecoEntrega,
        CEP
      };

      await api.post("./pedido", data, {
        headers: { _id }
      });
    }

    async function atualizarEstoque(_id, quantidade) {
      const data = {
        _id,
        quantidade
      };

      await api.put("./produtoQt", data, {});

      history.push("./PedidoCliente");
    }

    function valorTotal(valortotal) {
      const total = carrinho.reduce(
        (valorTotal, produto) =>
          valorTotal + produto.valor * produto.quantidade,
        0
      );
      if (moment(data).isSame(dataAtual)) {
        return (valortotal = (total - total * 0.05).toFixed(2));
      } else {
        return (valortotal = total.toFixed(2));
      }
    }

    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Booo Comics Order",
                  amount: {
                    currency_code: "BRL",
                    value: valorTotal()
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            await cadastrarPedido(valorTotal(), carrinho);
            carrinho.forEach(produto =>
              atualizarEstoque(produto._id, produto.quantidade)
            );
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(paypal.current);
    });

    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
  }

  function renderComp() {
    const valorDesconto = (valortotal - valortotal * 0.05).toFixed(2);

    if (moment(data).isSame(dataAtual)) {
      return (
        <>
          <span> Desconto de Aniversariante 5% </span>
          <br />
          <strong> Valor Total com Desconto: R${valorDesconto} </strong>
        </>
      );
    } else {
      return;
    }
  }

  return (
    <>
      <ul className="produto-carrinho">
        {carrinho.map(produto => {
          return <ProdutoCarrinho key={produto._id} {...produto} />;
        })}
      </ul>
      <div className="test">
        <strong>Valor Total: R$:{valortotal}</strong>
        <br />
        {renderComp()}
        <br />
        <label htmlFor="enderecoEntrega">
          Digite o Endereço de Entrega e o CEP
        </label>
        <br />
        <input
          id="enderecoEntrega"
          placeholder="Endereço"
          value={enderecoEntrega}
          onChange={event => setEnderecoEntrega(event.target.value)}
        />
        <br />
        <br />
        <input
          id="CEP"
          placeholder="XXXXX-XXX"
          value={CEP}
          onChange={event => setCEP(event.target.value)}
        />
        <br />
        <br />
        {checkout ? (
          <PayPal />
        ) : (
          <button
            className="lojabtn"
            onClick={() => {
              setCheckOut(true);
            }}
          >
            Checkout
          </button>
        )}
      </div>
    </>
  );
}

function ProdutoCarrinho(produto) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <li key={produto._id}>
        <p style={{ backgroundImage: `url(${produto.thumbnail_url})` }} />
        <strong>{produto.nome}</strong>
        <br />
        <span text-align="justify">{produto.descricao}</span>
        <br />
        <span>{produto.valor ? `R$: ${produto.valor}` : `GRATUITO`}</span>
        <br />
        <span>Quantidade: {produto.quantidade}</span>
        <br />
        <button className="iconbtn" onClick={() => setModal(true)}>
          <BsTrashFill />
        </button>{" "}
        <button
          className="iconbtn"
          onClick={() => dispatch(adicionarQuantidade(produto))}
        >
          <BsFillPlusCircleFill />
        </button>{" "}
        <button
          className="iconbtn"
          onClick={() => dispatch(removerQuantidade(produto))}
        >
          <BsFillDashCircleFill />
        </button>
      </li>
      <Modal size="lg" show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <p>Tem certeza que deseja remover o produto do carrinho ?</p>
          <button
            className="btnm"
            onClick={() => {
              dispatch(removerProduto(produto._id));
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
