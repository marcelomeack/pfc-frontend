import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const adicionarProduto = createAction("ADICIONAR_PRODUTO");
export const removerProduto = createAction("REMOVER_PRODUTO");
export const adicionarQuantidade = createAction("ADICIONAR_QUANTIDADE");
export const removerQuantidade = createAction("REMOVER_QUANTIDADE");

export default createReducer(INITIAL_STATE, {
  [adicionarProduto.type]: (state, action) => {
    const produto = action.payload;
    const produtoIndex = state.findIndex(p => p._id === produto._id);
    const produtos = JSON.parse(localStorage.getItem("produtoQt")).find(
      p => p._id === produto._id
    );
    if (produtoIndex > -1 && produto.quantidade < produtos.quantidade) {
      return [
        ...state.slice(0, produtoIndex),
        {
          ...state[produtoIndex],
          quantidade: state[produtoIndex].quantidade + 1
        },
        ...state.slice(produtoIndex + 1)
      ];
    }
    return [
      ...state,
      {
        _id: produto._id,
        nome: produto.nome,
        quantidade: 1,
        descricao: produto.descricao,
        thumbnail: produto.thumbnail,
        thumbnail_url: produto.thumbnail_url,
        valor: produto.valor
      }
    ];
  },

  [removerProduto.type]: (state, action) =>
    state.filter(produto => produto._id !== action.payload),

  [adicionarQuantidade.type]: (state, action) => {
    const produto = action.payload;
    const produtoIndex = state.findIndex(p => p._id === produto._id);
    const produtos = JSON.parse(localStorage.getItem("produtoQt")).find(
      p => p._id === produto._id
    );

    if (produtoIndex > -1 && produto.quantidade < produtos.quantidade) {
      return [
        ...state.slice(0, produtoIndex),
        {
          ...state[produtoIndex],
          quantidade: state[produtoIndex].quantidade + 1
        },
        ...state.slice(produtoIndex + 1)
      ];
    }
    return [...state];
  },

  [removerQuantidade.type]: (state, action) => {
    const produto = action.payload;
    const produtoIndex = state.findIndex(p => p._id === produto._id);
    if (produtoIndex > -1 && produto.quantidade >= 1) {
      return [
        ...state.slice(0, produtoIndex),
        {
          ...state[produtoIndex],
          quantidade: state[produtoIndex].quantidade - 1
        },
        ...state.slice(produtoIndex + 1)
      ];
    }
    return [...state];
  }
});
