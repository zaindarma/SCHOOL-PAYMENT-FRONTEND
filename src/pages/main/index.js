import Navbar from "@/components/organism/Navbar";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import ReactPlayer from "react-player";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Footer from "@/components/organism/Footer";
import Facilities from "@/components/organism/Facilities";
import AboutSchool from "@/components/organism/AboutSchool";
import MainBanner from "@/components/organism/MainBanner";

const MainPage = () => {
  const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar onClick={() => setIsModalOpen(true)} />
      <main>
        <MainBanner />
        <AboutSchool />
      </main>
      <Facilities />
      <Footer />
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MainPage;
