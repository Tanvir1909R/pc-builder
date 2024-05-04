const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cart:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const newCart = [...state.cart,...action.payload];
            state.cart = newCart
        }
    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer