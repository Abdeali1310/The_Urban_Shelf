import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
const NotFound = React.lazy(() => import("./helper/NotFound"));
const LandingPage = React.lazy(() => import("./components/LandingPage"));
const Products = React.lazy(() => import("./components/Products"));
const ProductDetails = React.lazy(() => import("./components/ProductDetails"));
const Cart = React.lazy(() => import("./components/Cart"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const Success = React.lazy(() => import("./components/Success"));
const MyOrders = React.lazy(() => import("./components/MyOrders"));
const Loader = React.lazy(() => import("./helper/Loader"));

const App = () => {
  return (
    <div className="h-screen w-full font-space-grotesk">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/explore"
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loader />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<Loader />}>
              <MyOrders />
            </Suspense>
          }
        />
        <Route
          path="/success"
          element={
            <Suspense fallback={<Loader />}>
              <Success />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
