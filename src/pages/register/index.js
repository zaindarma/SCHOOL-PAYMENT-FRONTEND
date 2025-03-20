import Navbar from "@/components/organism/Navbar";
import { useToast } from "@/context/ToastContext";
import { register } from "@/services/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RegisterPage = () => {
  const [errorRegister, setErrorRegister] = useState(null);
  const { showToast } = useToast();
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const payload = {
      nis: e.target.nis.value,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    try {
      const res = await register(payload);

      if (!res.status) {
        showToast(
          res.response?.data.message || res.error?.response?.data?.message || "An unexpected error occurred",
          true
        );
        setErrorRegister(res.response?.data.data || res.error?.response?.data?.data || "An unexpected error occurred");
      } else {
        router.push("/register/registsuccess");
      }
    } catch (error) {
      console.error(error);
      setErrorRegister("An unexpected error occurred");
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <Navbar onClick={() => setIsModalOpen(true)} />

            <div>
              <Image
                alt="logo"
                src="https://png.pngtree.com/png-vector/20220919/ourmid/pngtree-toga-hat-graduation-png-image_6205458.png"
                className="w-26 mx-auto"
                width={1280}
                height={1280}
              />
            </div>
            <div className="mt-6 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleRegister} className="mx-auto max-w-xs">
                  <input
                    id="nis"
                    className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="nis"
                    placeholder="NIS"
                  />
                  <input
                    id="name"
                    className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="name"
                    placeholder="Name"
                  />
                  <input
                    id="email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    id="password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    id="confirmPassword"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    By Signing Up, i agree to{" "}
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Terms of Service{" "}
                    </a>
                    and{" "}
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
