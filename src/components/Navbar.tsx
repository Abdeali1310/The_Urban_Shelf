import { useTheme } from "@/hooks/useTheme";
import type { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { PiNotebook } from "react-icons/pi";
const Navbar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const [isMobileView, setIsMobileView] = useState(false);
  const handleCart = () => {
    navigate("/cart");
  };
  return (
    <main
      className={` transition-colors duration-300 overflow-x-hidden overflow-y-hidden `}
    >
      <header>
        <nav className="flex justify-between md:justify-around px-4 md:px-6 pr-8 h-14 items-center  w-screen">
          <div className="brand font-montserrat font-bold text-xl text-zinc-400">
            <button onClick={() => navigate("/")} aria-label="home page">Urban Shelf</button>
          </div>
          <div className="nav-links hidden md:flex font-medium ">
            <ul className="flex gap-8">
              <li>
                <Link to={"/orders"}>Orders</Link>
              </li>
              <li>
                <button
                  aria-label="view cart"
                  onClick={handleCart}
                  className="relative"
                >
                  <FaShoppingCart size={24} />
                  {cart.items.length > 0 && (
                    <div
                      className={`cart-items-counter text-xs ${
                        theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
                      } h-5 w-5 rounded-xl absolute top-[-10px] right-[-10px] flex justify-center items-center`}
                    >
                      {cart.items.length}
                    </div>
                  )}
                </button>
              </li>
              <li>
                <button
                  aria-label="toggle theme"
                  onClick={toggleTheme}
                  className="hover:cursor-pointer"
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </li>
            </ul>
          </div>

          {/* for mobile */}
          <div className="relative md:hidden">
            <button
              aria-label="open menu"
              className="focus:outline-none"
              onClick={() => setIsMobileView(true)}
            >
              {!isMobileView && <HiMenu size={28} />}
            </button>

            {isMobileView && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
                className={`fixed top-0 right-0 h-screen ${
                  theme === "light"
                    ? "bg-white/30 backdrop-blur-md border border-white/20 text-black"
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
                }  w-64 z-50 shadow-lg  transition-all duration-300 px-6 py-8`}
              >
                <button
                  aria-label="Close Menu"
                  className="absolute top-4 right-4"
                  onClick={() => setIsMobileView(false)}
                >
                  <HiX size={24} />
                </button>
                <ul className="flex pt-12 font-semibold flex-col gap-6 text-lg ">
                  <li>
                    <Link to="/orders" onClick={() => setIsMobileView(false)}>
                      <div className="flex gap-3">
                        My Orders
                        <PiNotebook size={28} />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCart();
                        setIsMobileView(false);
                      }}
                      className="relative"
                    >
                      <div className="flex gap-3">
                        <div className="cart">Cart</div>
                        <FaShoppingCart size={24} />
                      </div>
                      {cart.items.length > 0 && (
                        <div
                          className={`cart-items-counter text-xs ${
                            theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
                          } h-5 w-5 rounded-xl absolute -top-2 -right-2 flex justify-center items-center`}
                        >
                          {cart.items.length}
                        </div>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMobileView(false);
                      }}
                    >
                      <div className="flex gap-3  items-center">
                        <div className="switch">Switch</div>
                        {theme === "light" ? (
                          <Moon size={20} />
                        ) : (
                          <Sun size={20} />
                        )}
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </main>
  );
});

export default Navbar;
