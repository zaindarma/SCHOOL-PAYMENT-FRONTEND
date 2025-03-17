import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player";

const AboutSchool = () => {
  return (
    <>
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
              history of academic excellence and the development of well-rounded
              students equipped for professional life, further education, and
              community service.
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
    </>
  );
};

export default AboutSchool;
