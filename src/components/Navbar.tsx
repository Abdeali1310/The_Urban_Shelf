import { useTheme } from "@/hooks/useTheme";
import type { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);

  return (
    <div
      className={` transition-colors duration-300 overflow-x-hidden overflow-y-hidden `}
    >
      <nav className="flex justify-around h-14 items-center w-screen">
        <div className="brand font-montserrat font-bold text-xl text-zinc-400">
          <a href="/">Carté</a>
        </div>
        <div className="nav-links font-medium flex">
          <ul className="flex gap-8">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/orders">Orders</a>
            </li>
            <li>
              <a href="/cart" className="relative">
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
              </a>
            </li>
            <li>
              <button onClick={toggleTheme} className="hover:cursor-pointer">
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
