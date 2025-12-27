"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_0ikfs5n",
        "template_62gg0gl",
        formRef.current,
        "KPDa5YSa96mzGVEKc"
      )
      .then(
        () => {
          setStatusMessage("Message sent successfully!");
          formRef.current?.reset();
        },
        (error) => {
          console.error(error);
          setStatusMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="py-20 px-6 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-xl mx-auto">
        I’d love to hear from you! Send me a message or use my contact info to reach out.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="flex-1 flex flex-col justify-start gap-6 px-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 border-2 border-blue-600 rounded-full text-blue-600">
              <FaEnvelope className="w-5 h-5" />
            </div>
            <a href="mailto:ravelakshan19@gmail.com" className="hover:underline">
              ravelakshan19@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 border-2 border-blue-600 rounded-full text-blue-600">
              <FaPhone className="w-5 h-5" />
            </div>
            <a href="tel:+94771234567" className="hover:underline">
              +94 71 154 5471
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 border-2 border-blue-600 rounded-full text-blue-600">
              <FaMapMarkerAlt className="w-5 h-5" />
            </div>
            <span>Pannipitiya, Sri Lanka</span>
          </div>
        </div>


        

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 border-2 border-gray-600 p-8 rounded-xl shadow-lg bg-transparent"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Send Me a Message
          </h3>

          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent text-gray-900 dark:text-white"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent text-gray-900 dark:text-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-transparent text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition mt-2"
          >
            Send Message
          </button>

          {statusMessage && (
            <p className="mt-4 text-green-600 dark:text-green-400">{statusMessage}</p>
          )}
        </form>

      </div>
    </section>
  );
}
