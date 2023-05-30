import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  category: "",
  added: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addItems: (state, action) => {
      if (!state.added) {
        state.items = [...state.items, action.payload];
      }
    },
    setAdded: (state, action) => {
      state.added = true;
    },
  },
});

export const { addItems, setAdded, setCategory } = productSlice.actions;

// Selectors - This is how we pull information from the Global store slice

export const selectItems = (state) => {
  let Items = [];

  state.products.items.map((item) => {
    if (state.products.category === "") {
      Items.push(item);
    } else if (item.category === state.products.category) {
      Items.push(item);
    }
  });

  return Items;
};
export const selectCategories = (state) => {
  let categories = [];
  state.products.items.map((item) => {
    const category = item.category;
    categories.push(category);
  });

  let filteredCategories = [...new Set(categories)];

  return filteredCategories;
};
export const selectAdded = (state) => state.products.added;

export default productSlice.reducer;
