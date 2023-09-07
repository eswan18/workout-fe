"use client";

// Taken from https://github.com/fkhadra/react-toastify/issues/963#issuecomment-1562754379

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
