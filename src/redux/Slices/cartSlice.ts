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



const loadCartFromSession = (): cartItem => {
  const data = sessionStorage.getItem("cart");
  return data
    ? JSON.parse(data)
    : {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
};
const saveCartToSession = (state: cartItem) => {
  sessionStorage.setItem("cart", JSON.stringify(state));
};
const updateTotals = (state: cartItem) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = state.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  saveCartToSession(state);
};

const initialState: cartItem = loadCartFromSession();

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
      }
      updateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      updateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      saveCartToSession(state);
    },
    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity < 15) {
          existingItem.quantity += 1;
        }
      }
      updateTotals(state);
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      updateTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
