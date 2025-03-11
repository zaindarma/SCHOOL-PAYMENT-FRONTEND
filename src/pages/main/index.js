import Navbar from "@/components/organism/Navbar";
import React, { useState } from "react";
import LoginModal from "./LoginModal";

const MainPage = () => {
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
        <section className="sticky h-screen bg-red-50">
          <h1>Miaw</h1>
        </section>
      </main>
      <section className="h-auto bg-slate-100">
        <div className="flex justify-between">
          <div className="container mx-auto flex justify-center h-full ">
            <div className="flex flex-col sticky py-20">
              <div className="bg-red-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-green-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-yellow-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-blue-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
            </div>
          </div>
          <div className="container mx-auto flex justify-center h-full ">
            <div className="flex flex-col sticky py-20">
              <div className="bg-red-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-green-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-yellow-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
              <div className="bg-blue-200 w-[400px] h-[300px] sticky top-[100px]">
                Div 1
              </div>
            </div>
          </div>
        </div>
      </section>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
