import React from "react";

const Loader = React.memo(() => {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
});

export default Loader;
