import { configureStore } from "@reduxjs/toolkit";

import carrinhoReducer from "./ducks/carrinho";

export default configureStore({
  reducer: {
    carrinho: carrinhoReducer
  }
});
