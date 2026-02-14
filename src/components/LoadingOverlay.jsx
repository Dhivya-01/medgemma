import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Import the GIF from public folder instead
import loadingGif from "../assets/MLloopsAnim.gif"; // Adjust the path if necessary

const LoadingOverlay = ({ children }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.setProperty(
        "--loading-spinner-display",
        "none"
      );
    } else {
      document.documentElement.style.removeProperty(
        "--loading-spinner-display"
      );
    }
  }, [isLoading]);

  return (
    <>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-[9999] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src={loadingGif}
              alt="Loading..."
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
