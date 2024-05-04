const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  categoryBuildProducts: [
    {
      image: "/icon/cpu.png",
      name: "CPU/Processor",
      link: "cpu",
      product: [],
    },
    {
      image: "/icon/motherboard.png",
      name: "Motherboard",
      link: "motherboard",
      product: [],
    },
    {
      image: "/icon/ram.png",
      name: "RAM",
      link: "ram",
      product: [],
    },
    {
      image: "/icon/power-supply.png",
      name: "Power Supply",
      link: "power-supply",
      product: [],
    },
    {
      image: "/icon/storage.png",
      name: "Storage Device",
      link: "storage-device",
      product: [],
    },
    {
      image: "/icon/monitor.png",
      name: "Monitor",
      link: "monitor",
      product: [],
    },
  ],
};

const buildProductSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    setToProductBuild: (state, action) => {
      const newProduct = action.payload;
      for (let pro of state.categoryBuildProducts) {
        if (pro.link === newProduct.category) {
          pro.product.push(newProduct);
        }
      }
    },
    removeProductBuild:(state,action)=>{
      for (let pro of state.categoryBuildProducts) {
        if (pro.link === action.payload) {
          pro.product = [];
        }
      }
    },

  },
});

export const {setToProductBuild,removeProductBuild} = buildProductSlice.actions

export default buildProductSlice.reducer;
