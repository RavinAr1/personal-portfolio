"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function About() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section
        id="about"
        className="w-full max-w-5xl mx-auto py-20 px-1 text-center sm:text-left"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center sm:text-left">
          About Me
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-6 text-base mb-6">
          I’m <span className="font-semibold text-blue-600">Ravindu Ariyarathne</span>, a  Software Engineering graduate with practical internship experience in full-stack development. 
          I’ve worked with Java, Spring Boot, MySQL, JavaScript, React and Python, and I enjoy learning new technologies while contributing to team projects. 
          I focus on building useful, user-friendly solutions and improving my skills through hands-on experience.
        </p>

        {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mt-10">

              {/* Education Column */}
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Education</h3>

                <div className="relative border-l-2 border-blue-600 pl-6">

                  {/* Degree */}
                  <div className="mb-6">
                    <p className="text-gray-900 dark:text-white font-semibold">
                      🎓 BEng (Hons) Software Engineering
                    </p>
                     
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-7">
                      Jan 2022 – Sep 2025
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-7">
                      University of Westminster (UK), IIT Sri Lanka
                    </p>
                  </div>

                  {/* A/L */}
                  <div className="mb-6">
                    <p className="text-gray-900 dark:text-white font-semibold">
                      🏫 G.C.E. Advanced Level Examination
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                       <span className="ml-7">Physical Science Stream</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <span className="ml-7">Royal College – Colombo 07</span>
                    </p>
                  </div>

                </div>
              </div>

              {/* Experience Column */}
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Experience</h3>

                <div className="relative border-l-2 border-blue-600 pl-6">

                  {/* Internship */}
                  <div className="mb-6">
                    
                    
                    <p className="text-gray-900 dark:text-white font-semibold">
                      💼 Undergraduate Intern – Software Engineering
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-7">
                      Aug 2023 – Aug 2024
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-7">
                      National Development Bank PLC
                    </p>

                  </div>

                </div>
              </div>

            </div>

      </section>
      

      {/* TECHNOLOGIES CAROUSEL */}
      <section
        id="technologies"
        className="w-full max-w-7xl mx-auto py-6 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Technical Skills & Tools
        </h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={12}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={true}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="pb-6 relative overflow-visible"
        >
          {[
            { name: "React", icon: "/icons/react-original.svg" },
            { name: "NextJs", icon: "/icons/nextjs-original.svg" },
            { name: "NodeJs", icon: "/icons/nodejs-original.svg" },
            { name: "HTML", icon: "/icons/html5-original.svg" },
            { name: "CSS", icon: "/icons/css3-original.svg" },
            { name: "Tailwind CSS", icon: "/icons/tailwindcss-original.svg" },
            { name: "Java", icon: "/icons/java-original.svg" },
            { name: "JavaScript", icon: "/icons/javascript-original.svg" },
            { name: "Python", icon: "/icons/python-original.svg" },
            { name: "MySQL", icon: "/icons/mysql-original.svg" },
            { name: "TypeScript", icon: "/icons/typescript-original.svg" },
            { name: "Spring Boot", icon: "/icons/springboot-original.svg" },
            { name: "Flask", icon: "/icons/flask-original.svg" },
            { name: "GitHub", icon: "/icons/github-original.svg" },
            { name: "Postman", icon: "/icons/postman-original.svg" },
            { name: "Ren'Py", icon: "/icons/renpy-original.svg" },
          ].map((tech) => (
            <SwiperSlide key={tech.name}>
              <div className="flex flex-col items-center">
                <img src={tech.icon} className="w-12 h-12 mb-1" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{tech.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
