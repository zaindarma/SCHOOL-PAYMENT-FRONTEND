import NavbarPay from "@/components/organism/NavbarPay";
import {
  ArrowRight,
  HandCoins,
  LayoutDashboard,
  ThumbsUp,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const PayindPage = () => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <NavbarPay />
      <section className="min-h-screen bg-white">
        <div className="flex justify-between gap-8 px-10 items-center">
          <div className="flex flex-col">
            <p className="text-sm text-[#0D9488]">
              SOLUTIONS FOR NOWADAYS EDUCATION
            </p>
            <h1 className="text-6xl leading-17 font-bold">
              Digitize your{" "}
              <span className="text-[#0D9488]">school payment</span> system
            </h1>
            <p className="py-10 opacity-70">
              Present online payment options in your system. Make it easier for
              students and parents to complete various educational payment
              billing needs.
            </p>
            <div className="flex">
              <button className="bg-[#0D9488] text-white px-8 py-2 rounded-lg flex items-center">
                Register now
              </button>
              <button className="border-2 border-[#0D9488] text-[#0D9488]  px-8 py-2 ml-4 rounded-lg flex">
                Contact Us
              </button>
            </div>
          </div>
          <div className="w-full">
            <Image src={"/banner.png"} alt="1" width={1280} height={1280} />
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col py-20">
        <div className="flex flex-col items-center gap-5 pb-10">
          <h1 className="text-3xl font-bold text-[#0D9488]">
            Why must payind?
          </h1>
          <p className="w-[500px] text-center">
            Payind Payment Gateway provides many online payment methods,
            integrated in one dashboard with high security standards.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 px-10">
          <div className="w-full bg-gray-100 rounded-lg py-10 px-10">
            <Wallet size={50} />
            <h1 className="font-bold text-xl pt-7">Payment Channels</h1>
            <p className="opacity-70 pt-2">
              Accept and speed up your school payment process through many and
              trusted payment channels.
            </p>
          </div>
          <div className="w-full bg-gray-100 rounded-lg py-10 px-10">
            <LayoutDashboard size={50} />
            <h1 className="font-bold text-xl pt-7">Advanced Dashboard</h1>
            <p className="opacity-70 pt-2">
              Use our dashboard to manage and track education payment
              transactions automatically, reducing manual workload.
            </p>
          </div>

          <div className="w-full bg-gray-100 rounded-lg py-10 px-10">
            <HandCoins size={50} />
            <h1 className="font-bold text-xl pt-7">Easier Payment</h1>
            <p className="opacity-70 pt-2">
              Send payment invoices using Easy Invoice. Just send a payment
              invoice with a payment link via WhatsApp, SMS or email.
            </p>
          </div>
          <div className="w-full bg-gray-100 rounded-lg py-10 px-10">
            <ThumbsUp size={50} />
            <h1 className="font-bold text-xl pt-7">
              Improve the learner experience
            </h1>
            <p className="opacity-70 pt-2">
              Simplify the payment process automatically and increase the level
              of student and parent satisfaction, because they can pay fees
              easily.
            </p>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gray-200"></section>
    </main>
  );
};

export default PayindPage;
