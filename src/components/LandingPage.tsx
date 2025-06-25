import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const LandingPage = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();
  const elements = [
    { title: "Aero Max", imageSrc: "/images/shoes/aeromax.png" },
    { title: "Dé Lemaire", imageSrc: "/images/watches/Dé Lemaire.png" },
    { title: "La Flappe", imageSrc: "/images/bags/La Flappe.png" },
    { title: "Velisse", imageSrc: "/images/heels/Valisse.png" },
  ];

  const itemRef = useRef(elements[Math.floor(Math.random() * elements.length)]);
  const item = itemRef.current;
  
  const handleExplore = () => {
    document.body.style.overflow = "hidden";
    setIsZooming(true)
    setTimeout(() => {
      navigate("/explore");
      setIsZooming(false);
    }, 400);
  };
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: isZooming ? 2 : 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden overflow-y-hidden ${
        theme === "light"
          ? "bg-[#FFFFF0] text-black"
          : "bg-black text-[#FFFFF0]"
      }`}
    >
      {/* Navbar */}
      <nav className="flex h-[7vh] justify-between px-7 lg:px-44 items-center">
        <Link to="/" className="text-zinc-400 hover:text-zinc-500 duration-200">
          <h4 className="font-montserrat font-bold tracking-wider text-xl">
            Carté
          </h4>
        </Link>

        <button onClick={toggleTheme} className="hover:cursor-pointer">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>

      <div className="relative h-[78vh] lg:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-28 lg:bottom-0 text-center font-montserrat font-semibold tracking-wider text-[80px] lg:text-[150px] xl:text-[210px] pointer-events-none"
        >
          {item.title}
        </motion.h1>

        <motion.img
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={item.imageSrc}
          alt={item.title}
          className="h-[40vh] lg:h-[60vh] transform hover:translate-y-5 duration-500 z-10 object-contain"
        />

        {/* Explore Button */}
      </div>
      <div className="w-screen flex justify-center items-center">
        <button
          onClick={handleExplore}
          className={`text-center bottom-10 lg:mt-10 z-20 px-6 py-2 rounded-full border transition-all duration-300 font-medium tracking-wide ${
            theme === "light"
              ? "border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white"
              : "border-zinc-200 text-zinc-200 hover:bg-zinc-200 hover:text-black"
          }`}
        >
          Explore
        </button>
      </div>
    </motion.div>
  );
});

export default LandingPage;
