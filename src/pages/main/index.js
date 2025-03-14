import Navbar from "@/components/organism/Navbar";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import ReactPlayer from "react-player";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const MainPage = () => {
  const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar onClick={() => setIsModalOpen(true)} />
      <main className="">
        <section className="sticky top-0 min-h-screen flex items-end justify-center bg-cover bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2024/03/IMG_2511-scaled.jpg')]">
          <div className="absolute min-h-screen bg-none duration-1000 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center text-center relative">
              <p className="text-xl font-bold tracking-widest text-white">
                GROW UP TOGETHER WITH US
              </p>
              <h1 className="text-7xl py-2 font-bold text-white">
                Miaw High School
              </h1>
              <h3 className="text-lg tracking-widest text-white">
                Educating the next generation of leaders and changemakers
              </h3>
            </div>
          </div>
          <div className="absolute min-h-screen bg-[rgba(255,255,255,0.75)] hover:opacity-100 opacity-0 duration-1000 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center text-center relative">
              <p className="text-xl font-bold tracking-widest text-gray-500">
                GROW UP TOGETHER WITH US
              </p>
              <h1 className="text-7xl py-2 font-bold text-[#79242f]">
                Miaw High School
              </h1>
              <h3 className="text-lg tracking-widest text-black">
                Educating the next generation of leaders and changemakers
              </h3>
            </div>
          </div>
        </section>

        <section className="py-10 sticky min-h-screen flex flex-col justify-center bg-white">
          <div className="h-fit flex flex-col items-center">
            <ReactPlayer
              url={"https://youtu.be/IrcoYCD9-nM?si=cLs3BivV6ioeBdPS"}
              controls
              width={800}
              height={450}
              playing={true}
              loop={true}
              muted={true}
            />
            <h1 className="flex py-8 tracking-widest justify-center text-3xl text-[#79242f]">
              MIAW HIGH SCHOOL
            </h1>
            <div className="flex justify-center bg-gray-400 text-[0.5px] w-2/3">
              -
            </div>
            <div className="py-10 gap-8 flex justify-center items-center flex-col">
              <Link
                href={"#"}
                className="flex text-md font-extrabold items-center gap-1 text-[#16562d]"
              >
                Read More <ArrowRight size={20} />
              </Link>
              <p className="flex text-center font-light text-2xl text-[#79242f] w-[700px]">
                As a selective entry high school, Miaw High School has a proud
                history of academic excellence and the development of
                well-rounded students equipped for professional life, further
                education, and community service.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 px-18 gap-5">
            <div className="w-[550px] h-[350px] flex flex-col justify-center items-center bg-cover bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/01/mhs-about-1.jpg')] hover:opacity-90 duration-300">
              <h1 className="text-md opacity-60 tracking-[0.4em] font-bold text-white">
                THE SCHOOL
              </h1>
              <h2 className="text-4xl text-white py-5">About MHS</h2>
              <button className="relative bg-white text-[#79242f] text-sm py-3 px-10 font-bold flex items-center gap-2 border-green-500 group hover:text-white duration-300">
                <span className="absolute inset-0 bg-green-500 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2 font-extrabold">
                  DISCOVER MORE <ArrowRight size={20} />
                </span>
              </button>
            </div>
            <div className="w-[550px] h-[350px] flex flex-col justify-center items-center bg-cover bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/01/mhs-curriculm-2.jpg')] hover:opacity-90 duration-300">
              <h1 className="text-md opacity-60 tracking-[0.4em] font-bold text-white">
                THE PAYMENT
              </h1>
              <h2 className="text-4xl text-white py-5">Payment</h2>
              <button className="relative bg-white text-[#79242f] text-sm py-3 px-10 font-bold flex items-center gap-2 border-green-500 group hover:text-white duration-300">
                <span className="absolute inset-0 bg-green-500 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2 font-extrabold">
                  DISCOVER MORE <ArrowRight size={20} />
                </span>
              </button>
            </div>
            <div className="w-[550px] h-[350px] flex flex-col justify-center items-center bg-cover bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/01/mhs-about-1.jpg')] hover:opacity-90 duration-300">
              <h1 className="text-md opacity-60 tracking-[0.4em] font-bold text-white">
                THE WORK
              </h1>
              <h2 className="text-4xl text-white py-5">Curriculum</h2>
              <button className="relative bg-white text-[#79242f] text-sm py-3 px-10 font-bold flex items-center gap-2 border-green-500 group hover:text-white duration-300">
                <span className="absolute inset-0 bg-green-500 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2 font-extrabold">
                  DISCOVER MORE <ArrowRight size={20} />
                </span>
              </button>
            </div>
            <div className="w-[550px] h-[350px] flex flex-col justify-center items-center bg-cover bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/01/mhs-curriculm-2.jpg')] hover:opacity-90 duration-300">
              <h1 className="text-md opacity-60 tracking-[0.4em] font-bold text-white">
                CONTACT US
              </h1>
              <h2 className="text-4xl text-white py-5">Enquire</h2>
              <button className="relative bg-white text-[#79242f] text-sm py-3 px-10 font-bold flex items-center gap-2 border-green-500 group hover:text-white duration-300">
                <span className="absolute inset-0 bg-green-500 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2 font-extrabold">
                  DISCOVER MORE <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <section className="h-auto sticky bg-white">
        <div className="flex pt-10 justify-center items-center">
          <h1 className="text-4xl text-[#79242f]">Our Facilities & Services</h1>
        </div>
        <div className="flex justify-between">
          <div className="container mx-auto flex justify-center h-full ">
            <div className="flex flex-col sticky py-10">
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2025/03/image-11.png')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2024/07/image-9.png')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 2
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2025/03/image-3-edited.png')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 3
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/02/17A0115.jpg')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 4
              </div>
            </div>
          </div>
          <div className="container mx-auto flex justify-center h-full ">
            <div className="flex flex-col sticky py-10">
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2025/02/image.png')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2023/02/17A9115-1536x1024.jpg')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2025/01/Gold-Coast.jpg')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-[url('https://mhs.vic.edu.au/wp-content/uploads/2024/12/Arhan-Busam-3.png')] bg-cover w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#79242f] text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between px-20 items-center">
          {/* Contact Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="list-none p-0">
              <li>Email: miaw@company.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Business St, City, Country</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={24} className="hover:text-gray-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={24} className="hover:text-gray-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={24} className="hover:text-gray-300" />
            </a>
          </div>
        </div>
      </footer>
      <div className="bg-white text-white pb-5">
        {/* Copyright */}
        <p className="text-center mt-6 text-[#79242f]">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
