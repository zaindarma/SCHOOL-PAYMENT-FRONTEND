import { login } from "@/services/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50); // Delay for smooth effect
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  async function handleLogin(e) {
    e.preventDefault();

    const payload = {
      identifier: e.target.identifier.value,
      password: e.target.password.value,
    };

    try {
      const res = await login(payload);
      if (res.status) {
        localStorage.setItem("token", res.token);
        window.location.reload();
      } else {
        const errorMsg = res.error?.response?.data?.data;
        console.log("Login error:", errorMsg);
        // setErrorLogin(errorMsg);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorLogin("An unexpected error occurred");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-800 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#79242f] p-6 rounded-lg shadow-lg max-w-md w-full transition-transform ${
          isVisible ? "scale-100" : "scale-30"
        }`}
      >
        <h2 className="text-xl text-white font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            id="identifier"
            type="identifier"
            placeholder="Email / NIS"
            className="w-full p-2 border rounded bg-white"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-red-700 text-white p-2 rounded">
            Login
          </button>
          <button className="w-full text-gray-500 mt-2" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
