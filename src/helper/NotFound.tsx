// src/components/NotFound.tsx
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

const NotFound = React.memo(() => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full text-center px-4 ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      }`}
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className={`px-6 py-2 rounded font-medium transition-all ${
          theme === "light"
            ? "bg-black text-white hover:bg-zinc-800"
            : "bg-white text-black hover:bg-zinc-300"
        }`}
      >
        Go Home
      </button>
    </div>
  );
});

export default NotFound;
