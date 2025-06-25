import products from "@/data/products";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useTheme } from "@/hooks/useTheme";

const Products = () => {
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={` ${
        theme === "light"
          ? "bg-[#FFFFF0] text-black"
          : "bg-black text-[#FFFFF0]"
      } px-4 lg:px-10 pt-2`}
    >
      <Navbar />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid mt-12"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((item) => (
          <div
            className={`item ${theme === "dark" ? "border border-zinc-800" : " border"} rounded-md`}
            key={item.id}
          >
            <Link to={`/products/${item.id}`} className="">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full rounded"
              />
              <div className="mt-2 flex w-full flex-col gap-1 text-center">
                <p className="text-zinc-400">{item.brand}</p>
                <p className="text-lg font-semibold">{item.title}</p>
                <div className="flex justify-between px-3 py-2">
                  <p>{item.price}K</p>
                  <p>{item.rating}⭐</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Masonry>
    </motion.div>
  );
};

export default Products;
