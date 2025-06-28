import { useTheme } from "@/hooks/useTheme";
import type { RootState } from "@/redux/store";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Success = React.memo(() => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const orders = useSelector((state: RootState) => state.orders);
  return orders.orders.length > 0 ? (
    <main
      className={`text-center ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      } font-semibold pt-24 px-12 h-screen`}
    >
      <header>
        <button
          className="absolute top-5 md:top-15 left-5 md:left-15"
          onClick={() => navigate(-1)}
        >
          <GoArrowLeft />
        </button>
      </header>
      <section>
        Your order has been placed successfully! . You can check at{" "}
        <Link to={"/orders"} className="text-blue-700">
          My Orders
        </Link>
        <br />
        <br />
        <Link to={"/explore"} className="text-red-600">
          Shop more
        </Link>
      </section>
    </main>
  ) : (
    <main
      className={`text-center pt-20 relative text-xl font-bold ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      } h-screen`}
    >
      <button
        className="absolute top-5 md:top-15 left-5 md:left-15"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
      </button>
      <h2>Your Cart is empty!</h2>
    </main>
  );
});

export default Success;
