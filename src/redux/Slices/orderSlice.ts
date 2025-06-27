// src/redux/Slices/orderSlice.ts

import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc: string;
  brand?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
