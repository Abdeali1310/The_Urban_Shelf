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
const loadOrdersFromSession = (): OrderState => {
  const data = sessionStorage.getItem("orders");
  return data ? JSON.parse(data) : { orders: [] };
};

const saveOrdersToSession = (state: OrderState) => {
  sessionStorage.setItem("orders", JSON.stringify(state));
};

const initialState: OrderState = loadOrdersFromSession();

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveOrdersToSession(state);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
