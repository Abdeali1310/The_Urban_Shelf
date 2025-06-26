import { useTheme } from "@/hooks/useTheme";
import type { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  
  const handleCart = ()=>{
    navigate("/cart")
  }
  return (
    <div
      className={` transition-colors duration-300 overflow-x-hidden overflow-y-hidden `}
    >
      <nav className="flex justify-around h-14 items-center w-screen">
        <div className="brand font-montserrat font-bold text-xl text-zinc-400">
          <button onClick={()=>navigate("/")}>Carté</button>
        </div>
        <div className="nav-links font-medium flex">
          <ul className="flex gap-8">
            <li>
              <Link to={"/"}>Home </Link>
            </li>
            <li>
              <Link to={"/orders"}>Orders</Link>
            </li>
            <li>
              <button onClick={handleCart} className="relative">
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
