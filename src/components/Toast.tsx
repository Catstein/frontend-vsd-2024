"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export interface ToastProps {
  children: ReactNode;
}

export function Toast({ children }: ToastProps) {
  const [windowWidth, setWindowWidth] = useState<number>();

  const getVideoSize = useCallback((window: Window) => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => getVideoSize(window));

      setWindowWidth(window.innerWidth);
    }
  }, [getVideoSize]);

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={() =>
          "relative flex flex-row items-start rounded-sm md:max-w-[24.0625rem] justify-between overflow-hidden cursor-pointer"
        }
        position={
          windowWidth && windowWidth > 640 ? "top-right" : "bottom-right"
        }
        autoClose={5000}
        icon={false}
        closeButton={false}
        hideProgressBar={true}
      />
      <div className=""></div>
    </>
  );
}
