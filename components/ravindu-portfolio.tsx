"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

// --- TYPES ---
interface TrailCell {
  x: number
  y: number
  opacity: number
}

export default function RavinduPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const trailRef = useRef<TrailCell[]>([])

  // --- CONFIGURATION ---
  const GRID_SIZE = 40 
  const GLOW_RADIUS = 120 
  const FADE_SPEED = 0.01 

  // --- CANVAS LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setMousePos({ x, y })
      const lastPoint = trailRef.current[trailRef.current.length - 1]
      if (!lastPoint || Math.hypot(lastPoint.x - x, lastPoint.y - y) > GRID_SIZE / 2) {
        trailRef.current.push({ x, y, opacity: 1.0 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Draw Trails
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        const point = trailRef.current[i]
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, GLOW_RADIUS)
        gradient.addColorStop(0, `rgba(6, 182, 212, ${point.opacity * 0.4})`)
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath(); ctx.arc(point.x, point.y, GLOW_RADIUS, 0, Math.PI * 2); ctx.fill()
        point.opacity -= FADE_SPEED
        if (point.opacity <= 0) trailRef.current.splice(i, 1)
      }

      // Draw Mouse
      const mouseGradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, GLOW_RADIUS)
      mouseGradient.addColorStop(0, "rgba(6, 182, 212, 0.5)")
      mouseGradient.addColorStop(1, "rgba(6, 182, 212, 0)")
      ctx.fillStyle = mouseGradient
      ctx.beginPath(); ctx.arc(mousePos.x, mousePos.y, GLOW_RADIUS, 0, Math.PI * 2); ctx.fill()

      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mousePos])

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* FIXED BACKGROUND CANVAS */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        
        {/* --- NAVBAR --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#home" className="text-xl font-bold tracking-wider hover:text-cyan-400 transition-colors">
              <span className="text-cyan-400">{'>'}</span> RAVINDU
            </a>
            <div className="flex items-center gap-8">
              <a href="#about" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">ABOUT</a>
              <a href="#projects" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">PROJECTS</a>
              <a href="#contact" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">CONTACT</a>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-light text-center mb-4 tracking-tight"
          >
            Ravindu Ariyarathne
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 text-center mb-8 font-light"
          >
            Full Stack Engineer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 mb-12"
          >
            <SocialLink href="https://linkedin.com/in/ravindu-ariyarathne/" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="https://github.com/RavinAr1" icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="mailto:ravelakshan19@gmail.com" icon={<Mail className="w-6 h-6" />} label="Email" />
          </motion.div>
        </section>

        {/* --- ABOUT ME SECTION --- */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Glass Container for text */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
              
              {/* Subtle internal gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-3xl font-bold mb-8 relative z-10">
                <span className="text-cyan-400">{'>'}</span> ABOUT ME
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light relative z-10">
                <p>
                  I’m Ravindu Ariyarathne, a Software Engineering graduate with practical internship experience in full-stack development. 
                  I possess a strong passion for building innovative web applications using technologies like 
                  <span className="text-cyan-200"> Java, Spring Boot, MySQL, React, and Python</span>.
                </p>
                <p>
                  With expertise in both frontend and backend ecosystems, I focus on creating scalable, efficient, and user-friendly solutions. 
                  My work revolves around leveraging modern frameworks to deliver high-quality products that solve real-world problems, 
                  while constantly refining my skills through hands-on experience and continuous learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- MARQUEE --- */}
        <section className="py-12 overflow-hidden border-y border-white/5 bg-white/[0.01] backdrop-blur-[2px]">
          <InfiniteMarquee />
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-32 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-24 tracking-tight">Featured Projects</h2>
          <div className="space-y-24">
            
            <ProjectCard
              title="SpendSense"
              description="AI-powered finance advisor that helps you track expenses, analyze spending patterns, and get personalized financial insights using machine learning."
              tech={["React", "Python", "Flask", "Machine Learning"]}
              images={["/finance-dashboard-charts.png", "/expense-tracking-interface.jpg", "/budget-visualization.jpg"]}
              codeUrl="https://github.com/RavinAr1/SpendSense"
              liveUrl="#"
              color="green" 
            />

            <ProjectCard
              title="ChatLink"
              description="Real-time chat application with WebSocket support, featuring group chats, file sharing, and instant notifications for seamless communication."
              tech={["Java", "Spring Boot", "MySQL", "WebSocket"]}
              images={["/modern-chat-interface.jpg", "/group-chat-messaging.jpg", "/chat-notifications.jpg"]}
              codeUrl="https://github.com/RavinAr1/ChatLink.git"
              liveUrl="https://chatlink-app-ravindu-f3bkbabrfmfahshx.westus3-01.azurewebsites.net"
              color="blue" 
            />

            <ProjectCard
              title="Personal Portfolio"
              description="Modern, responsive portfolio website with interactive animations, reactive grid background, and smooth user experience built with Next.js."
              tech={["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]}
              images={["/dark-portfolio-with-grid.jpg", "/project-showcase-layout.jpg", "/responsive-design-portfolio.jpg"]}
              codeUrl="https://github.com/RavinAr1/personal-portfolio"
              liveUrl="#"
              color="blue"
            />

          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-32 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-20 tracking-tight">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-8">
              <ContactInfo 
                href="mailto:ravelakshan19@gmail.com"
                icon={<Mail className="w-6 h-6" />} 
                label="Email" 
                value="ravelakshan19@gmail.com" 
              />
              <ContactInfo 
                href="tel:+94711545471"
                icon={<Phone className="w-6 h-6" />} 
                label="Phone" 
                value="+94 71 154 5471" 
              />
              <ContactInfo 
                href="https://maps.google.com/?q=Pannipitiya,Sri+Lanka"
                icon={<MapPin className="w-6 h-6" />} 
                label="Location" 
                value="Pannipitiya, Sri Lanka" 
              />
            </div>
            
            <ContactForm />
            
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 text-center text-gray-600 border-t border-white/5 font-light text-sm">
          <p>© 2026 Ravindu Ariyarathne. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

// --- SUB COMPONENTS ---

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-2xl transition-all duration-300 flex items-center justify-center bg-white/[0.02] border border-white/5"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered ? "0 0 25px rgba(6, 182, 212, 0.4)" : "none",
        borderColor: isHovered ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.05)",
        color: isHovered ? "white" : "gray"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
    >
      {icon}
    </a>
  )
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-6 p-4 rounded-3xl border border-transparent transition-all duration-300"
      style={{
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.03)" : "transparent",
        borderColor: isHovered ? "rgba(6, 182, 212, 0.5)" : "transparent",
        boxShadow: isHovered ? "0 0 25px rgba(6, 182, 212, 0.2)" : "none",
        transform: isHovered ? "translateX(10px)" : "translateX(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="p-4 rounded-2xl transition-colors duration-300"
        style={{
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.1)" : "rgba(255, 255, 255, 0.03)",
          color: isHovered ? "#22d3ee" : "#22d3ee"
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1 font-light tracking-wide uppercase">{label}</p>
        <p className="text-lg font-light text-white transition-colors duration-300"
           style={{ color: isHovered ? "white" : "#e5e7eb" }}
        >
          {value}
        </p>
      </div>
    </a>
  )
}

function ContactForm() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="space-y-8 p-8 rounded-3xl border transition-all duration-500 bg-white/[0.02] backdrop-blur-[4px]"
      style={{
        borderColor: isHovered ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.05)",
        boxShadow: isHovered ? "0 0 30px rgba(6, 182, 212, 0.2)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <textarea
        rows={4}
        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder:text-gray-600 resize-none"
        placeholder="Message"
      />
      <button className="px-10 py-4 border border-white/20 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 text-white rounded-full font-light transition-all duration-300 tracking-wide">
        Send Message
      </button>
    </div>
  )
}

function InfiniteMarquee() {
  const skills = [ "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "MySQL", "Python", "Flask", "Machine Learning", "Docker" ]
  const duplicatedSkills = [...skills, ...skills, ...skills]

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -2000] }}
        transition={{ x: { repeat: Number.POSITIVE_INFINITY, repeatType: "loop", duration: 40, ease: "linear" } }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full whitespace-nowrap text-gray-400 font-light tracking-wide">
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ProjectCard({ title, description, tech, images, codeUrl, liveUrl, color }: any) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const isGreen = color === "green"
  const glowColor = isGreen ? "rgba(34, 197, 94, 0.4)" : "rgba(59, 130, 246, 0.4)"
  const borderColor = isGreen ? "rgba(34, 197, 94, 0.5)" : "rgba(59, 130, 246, 0.5)"
  const pillStyle = isGreen 
    ? "bg-green-500/[0.05] border-green-500/20 text-green-200/80" 
    : "bg-blue-500/[0.05] border-blue-500/20 text-blue-200/80"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div 
      className="grid md:grid-cols-2 gap-10 rounded-3xl overflow-hidden p-6 md:p-8 transition-all duration-500 bg-white/[0.02] backdrop-blur-[4px] border border-white/5"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered 
          ? `0 20px 60px -10px rgba(0,0,0,0.5), 0 0 40px ${glowColor}` 
          : "none",
        borderColor: isHovered ? borderColor : "rgba(255, 255, 255, 0.05)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-black/40 rounded-2xl overflow-hidden">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentImage 
                  ? (isGreen ? "bg-green-400 w-8" : "bg-blue-400 w-8") 
                  : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-light tracking-tight text-white transition-colors"
              style={{ color: isHovered ? (isGreen ? "#4ade80" : "#60a5fa") : "white" }}
          >
            {title}
          </h3>
        </div>
        
        <p className="text-gray-400 mb-8 leading-relaxed font-light">{description}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {tech.map((item: string) => (
            <span
              key={item}
              className={`px-4 py-1.5 border rounded-full text-sm font-light transition-colors duration-300 ${isHovered ? pillStyle : "bg-white/[0.02] border-white/10 text-gray-400"}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <a
            href={codeUrl}
            target="_blank"
            className="flex-1 px-6 py-3 border border-white/10 hover:bg-white hover:text-black text-center rounded-lg font-light transition-all duration-300 text-sm tracking-wide text-white"
          >
            View Code
          </a>
          <a
            href={liveUrl}
            target="_blank"
            className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-center rounded-lg font-normal transition-all duration-300 text-sm tracking-wide"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  )
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder:text-gray-600"
      placeholder={placeholder}
    />
  )
}