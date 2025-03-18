import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });

    setTimeout(() => {
      setToast(null);
    }, 3000); // Hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] px-4 py-2 rounded-md text-white shadow-lg transition-opacity duration-300 bg-opacity-90"
          style={{
            backgroundColor: toast.isError ? "#DC2626" : "#16A34A", // Red for error, Green for success
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use in components
export const useToast = () => {
  return useContext(ToastContext);
};
