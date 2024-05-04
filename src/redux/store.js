import buildProductSlice from "./feature/buildProductSlice";
import cardReducer from './feature/cartSlice'

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    buildProductReducer:buildProductSlice,
    cart:cardReducer
  },
});

export default store
