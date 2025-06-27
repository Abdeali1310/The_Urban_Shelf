import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import orderReducer from "./Slices/orderSlice";
export const store = configureStore({
    reducer: {
        cart:cartReducer,
        orders:orderReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;