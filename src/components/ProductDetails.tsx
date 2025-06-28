import products from "@/data/products";
import type { ProductType } from "@/types";
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "@/hooks/useTheme";
import { RxArrowTopRight } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/Slices/cartSlice";
import type { RootState } from "@/redux/store";
import { GoArrowLeft } from "react-icons/go";
import Loader from "@/helper/Loader";

const ProductDetails = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [isAdded, setIsAdded] = useState(false);
  const productId = id ? parseInt(id) : null;

  const product: ProductType | null = useMemo(() => {
    return products.find((item) => item.id === productId) || null;
  }, [productId]);

  const handleCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id.toString(),
        brand: product.brand,
        title: product.title,
        price: product.price,
        imageSrc: product.imageSrc,
        quantity: 1,
      })
    );

    setIsAdded(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const isInCart = useMemo(() => {
    if (!product) return false;
    return cart.items.some((item) => item.id === product.id.toString());
  }, [cart.items, product]);

  return product ? (
    <main
      className={`min-h-screen relative w-full ${
        theme === "light"
          ? "bg-[#FFFFF0] text-black"
          : "bg-black text-[#FFFFF0]"
      }`}
    >
      <header className="w-full sticky top-0 z-50">
        <Navbar />
      </header>

      <section className="flex items-center mt-12 md:mt-0 justify-center min-h-[calc(100vh-4rem)] px-4">
        <button className="absolute top-15 left-5" onClick={() => navigate(-1)}>
          <GoArrowLeft />
        </button>
        <section>
          <div className="relative flex flex-col md:flex-row gap-12 items-center max-w-6xl w-full">
            <article className="relative w-full md:w-1/2 flex items-start justify-center">
              <img
                className="h-[50vh] object-contain"
                src={product.imageSrc}
                alt={product.title}
              />
              {product.bestseller && (
                <span className="absolute top-0 left-0 bg-zinc-600 text-white text-[10px] px-6 py-1 rounded-br-lg rounded-tl-md transform shadow-md">
                  Bestseller
                </span>
              )}
            </article>

            <aside className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold">{product.title}</h2>
                <p className="text-md font-bold text-zinc-500">
                  {product.brand}
                </p>
              </div>

              <p className="text-xl font-semibold">₹{product.price}K</p>

              <p
                className={`text-base leading-relaxed ${
                  theme === "light" ? "text-zinc-600" : "text-zinc-300"
                } mt-4`}
              >
                {product.description}
              </p>

              <div className="mt-6 mb-10">
                {isAdded || isInCart ? (
                  <button
                    onClick={handleGoToCart}
                    className={`w-full py-2 px-4 text-md font-semibold cursor-pointer rounded flex items-center justify-center gap-2 transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "bg-zinc-100 text-black hover:bg-zinc-300"
                    }`}
                  >
                    Go to Cart <RxArrowTopRight className="text-lg" />
                  </button>
                ) : (
                  <button
                    onClick={handleCart}
                    className={`w-full py-2 px-4 text-md font-semibold cursor-pointer rounded transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "bg-zinc-100 text-black hover:bg-zinc-300"
                    }`}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  ) : (
    <main
      className={`w-full min-h-screen ${
        theme === "light"
          ? "bg-[#FFFFF0] text-black hover:bg-zinc-800"
          : "bg-black text-white hover:bg-zinc-300"
      } flex items-center justify-center text-xl font-medium`}
    >
      <Loader />
    </main>
  );
});

export default ProductDetails;
