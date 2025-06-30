import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  src: string;
  alt: string;
  className?: string;
  heightClass?: string;
};

const ShimmerImage = ({
  src,
  alt,
  className = "",
  heightClass = "h-[50vh]",
}: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { theme } = useTheme(); // light | dark

  return (
    <div className={`relative w-full ${heightClass}`}>
      {!imgLoaded && (
        <div
          className={`absolute inset-0 overflow-hidden rounded-md ${
            theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"
          }`}
        >
          <div className="absolute inset-0 w-full h-full shimmer-bg animate-shimmer" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`transition-opacity duration-500 object-contain w-full h-full ${
          imgLoaded ? "opacity-100" : "opacity-0 absolute"
        } ${className}`}
      />
    </div>
  );
};

export default ShimmerImage;
