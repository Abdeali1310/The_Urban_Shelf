import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import Navbar from "./Navbar";
import { useTheme } from "@/hooks/useTheme";
import products from "@/data/products";

const categories = [
  "all",
  "shoes",
  "bags",
  "perfume",
  "heels",
  "watches",
  "sunglasses",
];
const Products = React.memo(() => {
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };

  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showFilterModal ? "hidden" : "unset";
  }, [showFilterModal]);

  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const closeModal = () => setShowFilterModal(false);
  return (
    <motion.main
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`min-h-screen ${
        theme === "light"
          ? "bg-[#FFFFF0] text-black"
          : "bg-black text-[#FFFFF0]"
      } px-4 lg:px-10 pt-2`}
    >
      <header>
        <Navbar />
      </header>

      {/* Filter Button */}
      <section>
        <article className="flex justify-between items-center mt-6 px-2">
          <h3 className="text-xl font-bold">Products</h3>
          <button
            aria-label="Open filter menu"
            onClick={() => setShowFilterModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md  ${
              theme === "light"
                ? "border border-zinc-800"
                : "border border-zinc-600"
            }`}
          >
            <FiFilter />
            <span>Filter</span>
          </button>
        </article>

        {/* Products Grid */}
        <section>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid mt-8"
            columnClassName="my-masonry-grid_column"
          >
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className={`item rounded-md overflow-hidden ${
                  theme === "dark" ? "border border-zinc-800" : "border"
                }`}
              >
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full rounded-t-md"
                  />
                  <div className="mt-2 flex flex-col gap-1 text-center px-3 pb-4">
                    <p className="text-zinc-400">{item.brand}</p>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <div className="flex justify-between text-sm">
                      <div className="font-semibold">{item.price}K</div>
                      <div className="flex gap-1 items-center">
                        <span className="font-semibold">{item.rating}</span>
                        <span>★</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Masonry>
        </section>

        {/* Filter Side Modal */}
        <aside>
          {showFilterModal && (
            <div
              className={`fixed top-0 right-0 h-full w-[300px] z-50 shadow-lg transition-all duration-300 ease-in-out ${
                theme === "light"
                  ? "bg-[#FFFFF0] text-black"
                  : "bg-black text-[#FFFFF0]"
              }`}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Filter Categories</h2>
                  <button
                    aria-label="Close filter menu"
                    onClick={closeModal}
                    className="text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="filter-heading"
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        closeModal();
                      }}
                      className={`text-left px-4 py-2 rounded-md ${
                        activeCategory === cat
                          ? theme === "light"
                            ? "bg-black text-white"
                            : "bg-[#FFFFF0] text-black"
                          : theme === "light"
                          ? "hover:bg-zinc-200"
                          : "hover:bg-zinc-800"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>
    </motion.main>
  );
});

export default Products;
