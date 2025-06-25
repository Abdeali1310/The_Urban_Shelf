import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItemType {
  id: string;
  brand: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc: string;
}

interface cartItem {
  items: CartItemType[];
  totalItems: number;
  totalAmount: number;
}

const initialState: cartItem = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const updateTotals = (state: cartItem) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = state.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });

        updateTotals(state);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      updateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    decreaseQuantity: (state) => {
      state.items.forEach((item) => item.quantity > 1 && item.quantity--);
      updateTotals(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
