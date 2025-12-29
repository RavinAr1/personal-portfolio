"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";

export default function Hero() {
  return (
    <section id="hero"
     className="flex min-h-screen flex-col items-center justify-center bg-transparent text-center px-6">

      {/* Profile Image */}
      <Image
        src="/profile-image.jpg"
        alt="Profile photo"
        width={200}
        height={200}
        className="rounded-full mb-6"
        priority
      />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-2">
        Hi, I’m <span className="text-blue-600">Ravindu Ariyarathne</span>
      </h1>

      {/* Subheading */}
      <h2 className="text-lg text-gray-300 mb-6">
      Full-Stack Developer | Passionate About Building Smart Digital Solutions
      </h2>

      {/* Main Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <a
          href="#projects"
          className="rounded-full border border-yellow-600 text-blue-600 px-6 py-3 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-full border border-yellow-600 text-blue-600 px-6 py-3 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
        >
          Contact Me
        </a>
        <a
          href="/resume/Ravindu Ariyarathne - Resume - Trainee Software Engineer.pdf"
          download="Ravindu Ariyarathne - Resume"
          className="rounded-full border border-yellow-600 text-blue-600 px-6 py-3 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
        >
          Download Resume
        </a>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://www.linkedin.com/in/ravindu-ariyarathne/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/RavinAr1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
        >
          <FaGithub /> GitHub
        </a>


        <a
          href="mailto:ravelakshan19@gmail.com"
          target="_blank"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          <FaEnvelope /> Email
        </a>


        {/* <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          <SiHackerrank /> HackerRank
        </a> */}
      </div>
    </section>
  );
}
