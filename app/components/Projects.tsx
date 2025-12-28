"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    title: "SpendSense",
    description: "SpendSense is an AI-powered personal finance advisor that helps users make smarter budgeting, spending, and investment decisions. It analyzes income, expenses, and SMS-based transaction data to generate personalized budget plans, detect unusual financial activity, and deliver actionable insights. The system integrates machine learning models for multi-category expense prediction, anomaly detection from SMS alerts, stock forecasting. With a React-based dashboard and a Flask API backend, SpendSense provides real-time visualizations, intelligent recommendations, and an interactive chatbot designed to support users more effectively.",
    images: [
      "/projects/spendsense-1.jpg",
      "/projects/spendsense-2.jpg",
      "/projects/spendsense-3.jpg",
    ],
    technologies: ["React", "Python", "Flask", "JavaScript", "Machine Learning"],
    link: "https://github.com/RavinAr1/SpendSense",
  },

  {
    title: "ChatLink",
    description: "ChatLink is a real-time communication platform designed to facilitate seamless and secure messaging. Built on a Java Spring Boot foundation with a Thymeleaf frontend, it leverages WebSocket technology to deliver instant message synchronization and a responsive user experience across devices. The application features secure user authentication, support for file attachments within chats, and automated email notifications via API integration. With a scalable MySQL database for persistence and Docker support for streamlined deployment, ChatLink provides a reliable, full-stack solution for interactive connectivity.",
    images: [
      "/projects/project2-1.jpg",
      "/projects/project2-2.jpg",
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Docker","WebSocket"],
    link: "https://github.com/RavinAr1/ChatLink.git",
    demoLink: "https://chatlink-app-ravindu-f3bkbabrfmfahshx.westus3-01.azurewebsites.net", 
  },


    {
    title: "Personal Portfolio Website",
    description: "A modern, high-performance personal website designed to showcase my software engineering portfolio and professional identity. Built with Next.js and TypeScript, it features a fully responsive, mobile-first design styled with Tailwind CSS. The application integrates Swiper.js for interactive UI elements, a custom video background for visual engagement, and a serverless contact form powered by EmailJS for direct communication. Deployed on Vercel, this project demonstrates my ability to build polished, scalable frontend solutions.",
    images: [
      "/projects/project2-1.jpg",
      "/projects/project2-2.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS",],
    link: "https://github.com/RavinAr1/personal-portfolio",
  },

];

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-5xl mx-auto py-20 px-1">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        My Projects
      </h2>

      <div className="flex flex-col gap-12">
  {projects.map((project, idx) => (
    <div
      key={idx}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transform transition"
    >
      {/* Project Image Carousel */}
      {/* <Swiper
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-64"
      >
        {project.images.map((img, i) => (
          <SwiperSlide key={i} className="relative w-full h-64">
            <Image
              src={img}
              alt={`${project.title} image ${i + 1}`}
              fill
              className="object-cover rounded-t-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}


      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>



        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>



      {/* Action Links */}
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                ></a>


                  <a
                    href={project.link}
                    target="_blank"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    View Code
                  </a>

      {/* Conditional Rendering for Live Demo */}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                  >
                    Live Demo
                  </a>
                  )}

                  </div>



      </div>
    </div>
  ))}
</div>

    </section>
  );
}
