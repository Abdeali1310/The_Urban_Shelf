/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from "@/hooks/useTheme";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/Slices/cartSlice";
import type { RootState } from "@/redux/store";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";
const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const navigate = useNavigate();
  return cart.items.length > 0 ? (
    <div
      className={`min-h-screen relative py-10 px-4 md:px-10 ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      <button
        className="absolute top-5 md:top-15 left-5 md:left-15"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
      </button>

      <div
        className={` px-4 py-8 ${
          theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto  flex flex-col items-start justify-center lg:flex-row gap-12">
          <div className="w-full lg:w-2/3  flex  flex-col gap-6">
            <table className="hidden lg:table w-full ">
              <thead className="h-16 text-center border-b">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr
                    key={item.id}
                    className={`${
                      theme === "dark" ? "border-b-zinc-500" : "border-zinc-300"
                    }`}
                  >
                    <td className="py-4">
                      <div className="flex justify-center items-center gap-4">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-24 h-24 object-contain"
                        />
                        <div>
                          <h2 className="font-semibold text-lg">
                            {item.title}
                          </h2>
                          <p className="text-sm text-zinc-500">{item.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">₹{item.price}K</td>
                    <td>
                      <div className="qty flex gap-3 justify-center items-center">
                        <button
                          className="text-xl px-2"
                          onClick={() =>
                            dispatch(decreaseQuantity({ id: item.id }))
                          }
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          className="text-xl px-2"
                          onClick={() =>
                            dispatch(increaseQuantity({ id: item.id }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      ₹{(item.price * item.quantity).toFixed(2)}K
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            {cart.items.map((item) => (
              <div
                key={item.id}
                className={`
                    flex flex-col md:flex-row gap-4 p-4 rounded-lg shadow-md
                    ${
                      theme === "dark"
                        ? "border border-zinc-700 bg-zinc-900"
                        : "border border-zinc-300 "
                    } 
                    lg:hidden
                  `}
              >
                <div className="flex gap-4 items-center w-full md:w-2/3">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-zinc-500">{item.brand}</p>
                    <p className="font-medium mt-1">₹{item.price}K</p>
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center w-full md:w-1/3">
                  <div className="qty flex gap-5 lg:mt-3 items-center">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity({ id: item.id }))
                      }
                      className="text-xl"
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        dispatch(increaseQuantity({ id: item.id }))
                      }
                      className="text-xl"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`${
              theme === "dark" ? "border-zinc-700" : "border-zinc-300"
            } border w-full lg:w-1/3   rounded-lg p-6 shadow-sm`}
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Total Items:</span>
              <span>{cart.totalItems}</span>
            </div>
            

            <div className="flex justify-between py-4 text-lg font-semibold">
              <span>Amount : </span>
              <span>₹{cart.totalAmount.toFixed(2)}K</span>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 mt-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className={`w-full py-2 mt-4 px-4 text-md font-semibold cursor-pointer rounded flex items-center justify-center gap-2 transition-colors duration-300 ${
                theme === "light"
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-zinc-100 text-black hover:bg-zinc-300"
              }`}
            >
              Checkout <RxArrowTopRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
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
    </div>
  );
};

export default Cart;
