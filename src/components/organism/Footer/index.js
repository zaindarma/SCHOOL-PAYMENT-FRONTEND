import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
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
          © {new Date().getFullYear()} Miaw Company. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
