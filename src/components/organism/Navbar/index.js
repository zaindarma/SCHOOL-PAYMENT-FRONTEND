import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = ({ onClick }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  console.log(setToken);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className={`fixed z-30 top-0 left-0 w-full flex flex-wrap items-center justify-between px-16 bg-[#79242f] shadow-md p-4 transition-transform duration-300`}>
      <Link href={"/main"}>
        <h1 class="text-xl text-white font-bold">MIAW SCHOOL</h1>
      </Link>

      <div class="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <list>
          <ul class="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
            <li>
              <Link class="md:p-4 py-3 px-0 block" href="#">
                About
              </Link>
            </li>
            <li>
              <Link class="md:p-4 py-3 px-0 block" href="#">
                News
              </Link>
            </li>
            <li>
              <Link class="md:p-4 py-3 px-0 block" href="/payind">
                Payment
              </Link>
            </li>
            <li>
              <Link class="md:p-4 py-3 px-0 block md:mb-0 mb-2" href="#">
                Contact
              </Link>
            </li>
          </ul>
        </list>
      </div>

      <div>
        {token ? (
          <button onClick={handleLogout} className="hover:text-blue-600 text-white px-4 py-2 rounded-md flex flex-row items-center gap-2">
            Logout <ArrowRight size={20} />
          </button>
        ) : (
          <list>
            <ul class="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
              <li>
                <Link class="md:p-4 py-3 px-0 block hover:text-blue-600" href="/register">
                  Register
                </Link>
              </li>
              <li>
                <button class="md:p-4 py-3 px-0 block bg-[#79242f] hover:text-blue-600" onClick={onClick}>
                  Login
                </button>
              </li>
            </ul>
          </list>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
