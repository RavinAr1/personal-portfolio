"use client"; // because we'll use scroll and state here

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="#"
          className="text-xl font-bold text-gray-900 dark:text-white tracking-tight"
        >
          <span className="text-blue-600"> </span>Ravindu<span className="text-blue-600"></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300 font-medium">
            
          <a href="#hero" className="hover:text-blue-600">
            Home
          </a>
          
        
          <a href="#about" className="hover:text-blue-600">
            About
          </a>

          
          <a href="#projects" className="hover:text-blue-600">
            Projects
          </a>


          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
          
          
          <a
            href="https://github.com/RavinAr1" // replace with your GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-4 space-y-4">
          
          
          <a href="#hero" onClick={() => setIsOpen(false)}>
            Home
          </a>
          
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
          
          <a href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          
          
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
          <a
            href="https://github.com/RavinAr1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
