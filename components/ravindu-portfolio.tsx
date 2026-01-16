"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image" 
import { Mail, Phone, MapPin, Github, Linkedin, Download, Briefcase, GraduationCap, Menu, X, Eye } from "lucide-react"
import emailjs from '@emailjs/browser'
import { useToast } from "@/hooks/use-toast"

// --- TYPES ---
interface TrailCell {
  x: number
  y: number
  opacity: number
}

export default function RavinduPortfolio() {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Mouse position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
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
      
      {/* BACKGROUND CANVAS */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        


        {/* --- NAVBAR --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">

            {/* Logo area */}
            <a href="#home" className="flex items-center gap-3 group transition-colors relative z-50">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-500/30 
              group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                <Image src="/images/logo.png" alt="RA Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-wider group-hover:text-cyan-400 text-white transition-colors">
                RAVINDU
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">ABOUT</a>
              <a href="#projects" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">PROJECTS</a>
              <a href="#contact" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">CONTACT</a>
              <a href="https://github.com/RavinAr1" target="_blank" rel="noopener noreferrer" className="text-sm font-light tracking-widest hover:text-cyan-400 transition-colors">GITHUB</a>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden text-white relative z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 w-full bg-[#020617] border-b 
              border-white/10 pt-24 pb-10 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light 
              tracking-widest hover:text-cyan-400">ABOUT</a>

              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light 
              tracking-widest hover:text-cyan-400">PROJECTS</a>

              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light 
              tracking-widest hover:text-cyan-400">CONTACT</a>

              <a href="https://github.com/RavinAr1" target="_blank" rel="noopener noreferrer" 
              className="text-lg font-light tracking-widest hover:text-cyan-400">GITHUB</a>
            </motion.div>
          )}
        </nav>




      {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          
          {/* Main Flex Container*/}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            
            {/* Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 
              border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.3)] shrink-0"
            >
              <Image 
                src="/images/profile-image.jpg" 
                alt="Ravindu Ariyarathne"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text Container */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-light tracking-tight mb-4"
              >

                Ravindu <br className="hidden md:block" /> Ariyarathne
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 font-light"
              >
                Full Stack Software Developer
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            {/* Social Icons */}
            <div className="flex gap-6">
              <SocialLink href="https://linkedin.com/in/ravindu-ariyarathne/" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
              <SocialLink href="https://github.com/RavinAr1" icon={<Github className="w-6 h-6" />} label="GitHub" />
              <SocialLink href="mailto:ravelakshan19@gmail.com" icon={<Mail className="w-6 h-6" />} label="Email" />
            </div>

            {/* Resume Section */}
            
            <div className="flex items-center gap-1 p-1 bg-cyan-500/10 border border-cyan-500/50 rounded-full pl-6 pr-1 
            shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 group">
              
              {/* RESUME LABEL */}
              <span className="text-cyan-400 font-medium tracking-widest text-xs md:text-sm mr-2">RESUME</span>
              
            {/* Separator */}
              <div className="w-px h-4 bg-cyan-500/30 mx-1" />

              {/* View Button*/}
              <a 
                href="/resume/Ravindu Ariyarathne - Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-cyan-500 hover:text-black text-cyan-400 transition-all duration-300"
                aria-label="View Resume"
                title="View Resume"
              >
                <Eye className="w-4 h-4" />
              </a>

              {/* Download Button */}
              <a 
                href="/resume/Ravindu Ariyarathne - Resume.pdf" 
                download="Ravindu Ariyarathne - Resume"
                className="p-3 rounded-full hover:bg-cyan-500 hover:text-black text-cyan-400 transition-all duration-300"
                aria-label="Download Resume"
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>

            </div>
          </motion.div>
        </section>






        {/* --- ABOUT ME SECTION --- */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            

            {/* About Me Card */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative 
            overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
              
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-
              hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-3xl font-bold mb-8 relative z-10">
                <span className="text-cyan-400"></span> ABOUT ME
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light relative z-10">
                <p>
                  I’m  <span className="text-cyan-200">Ravindu Ariyarathne</span>, a recent  
                  <span className="text-cyan-200">Software Engineering</span> graduate with hands-on experience in full-stack development.
                   I enjoy transforming ideas into reliable, intuitive, and meaningful software products that make a difference.
                </p>
                <p>
                  With experience in both frontend and backend ecosystems, I focus on designing and building scalable,
                   reliable, and user-friendly systems. My approach revolves around continuous learning, improving my craft, 
                   and delivering high-quality work through practical, real-world problem solving.
                </p>
              </div>
              
            </div>
          </div>
        </section>






{/* ---  TIMELINE SECTION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
              
              {/* Education Column */}
              <div>
                <h3 className="text-3xl font-light mb-8 flex items-center gap-3 text-cyan-400">
                  <GraduationCap className="w-8 h-8" />
                  <span>Education</span>
                </h3>
                
                <div className="space-y-8 border-l border-white/10 pl-8 ml-3">
                  <TimelineItem 
                    title="BEng (Hons) Software Engineering"
                    subtitle="University of Westminster (UK), IIT Sri Lanka"
                    date="Jan 2022 – Sep 2025"
                  />
                  <TimelineItem 
                    title="G.C.E. Advanced Level Examination(2019)"
                    subtitle="Royal College – Colombo 07"
                    date="Physical Science Stream"
                  />
                </div>
              </div>

              {/* Experience Column */}
              <div>
                <h3 className="text-3xl font-light mb-8 flex items-center gap-3 text-cyan-400">
                  <Briefcase className="w-8 h-8" />
                  <span>Experience</span>
                </h3>

                <div className="space-y-8 border-l border-white/10 pl-8 ml-3">
                  <TimelineItem 
                    title="Undergraduate Intern – Software Engineering"
                    subtitle="National Development Bank PLC"
                    date="Aug 2023 – Aug 2024"
                  />

                  <TimelineItem 
                    title="Trainee – Personal Financial Services Department"
                    subtitle="DFCC Bank PLC"
                    date="Feb 2021 – June 2021"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>






        

        {/* --- MARQUEE --- */}
        <section className="py-12 overflow-hidden border-y border-white/5 bg-white/[0.01] backdrop-blur-[2px]">
          <InfiniteMarquee />
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-24 tracking-tight">Featured Projects</h2>
          <div className="space-y-24">
            
            <ProjectCard
              title="SpendSense"
              description="SpendSense is an AI-powered personal finance advisor that helps users make smarter budgeting,
                spending, and investment decisions. It analyzes income, expenses, and SMS-based transaction data to generate
                personalized budget plans, detect unusual financial activity, and deliver actionable insights. The system 
                integrates machine learning models for multi-category expense prediction, anomaly detection from SMS alerts, 
                stock forecasting. With a React-based dashboard and a Flask API backend, SpendSense provides real-time visualizations,
                intelligent recommendations, and an interactive chatbot designed to support users more effectively."

              tech={["React", "Python", "Flask", "JavaScript", "Machine Learning"]}
              images={["/images/projects/spendsense/spendsense-image1.png",
                      "/images/projects/spendsense/spendsense-image2.png",
                      "/images/projects/spendsense/spendsense-image3.png",
                      "/images/projects/spendsense/spendsense-image4.png",
                      "/images/projects/spendsense/spendsense-image5.png",]}

              codeUrl="https://github.com/RavinAr1/SpendSense"
              liveUrl="#"
              color="green" 
            />

            <ProjectCard
              title="ChatLink"
              description="ChatLink is a real-time communication platform designed to facilitate seamless and secure messaging. 
                Built on a Java Spring Boot foundation with a Thymeleaf frontend, it leverages WebSocket technology to deliver instant
                message synchronization and a responsive user experience across devices. The application features secure user 
                authentication, support for file attachments within chats, and automated email notifications via API integration. 
                With a scalable MySQL database for persistence and Docker support for streamlined deployment, ChatLink provides a 
                reliable, full-stack solution for interactive connectivity."

              tech={["Java", "Spring Boot", "MySQL", "Thymeleaf", "Docker","WebSocket"]}
              images={["/images/projects/chatlink/chatlink-image1.png",
                    "/images/projects/chatlink/chatlink-image2.png",
                    "/images/projects/chatlink/chatlink-image3.png",
                    "/images/projects/chatlink/chatlink-image4.png",
                    "/images/projects/chatlink/chatlink-image5.png",]}
              codeUrl="https://github.com/RavinAr1/ChatLink.git"
              liveUrl="https://chatlink-app-ravindu-f3bkbabrfmfahshx.westus3-01.azurewebsites.net"
              color="blue" 
            />

            <ProjectCard
              title="Personal Portfolio"
              description="A modern, high-performance personal website designed to showcase my software engineering
                portfolio and professional identity. Built with Next.js and TypeScript, it features a fully responsive, 
                mobile-first design styled with Tailwind CSS. The application integrates Swiper.js for interactive UI elements,
                a custom video background for visual engagement, and a serverless contact form powered by EmailJS for direct
                communication. Deployed on Vercel, this project demonstrates my ability to build polished, scalable frontend solutions."
       
              tech={["Next.js", "TypeScript", "Tailwind CSS","EmailJS"]}
              images={["/images/projects/portfolio-project/my-portfolio-image1.png",
                    "/images/projects/portfolio-project/my-portfolio-image2.png"]}

              codeUrl="https://github.com/RavinAr1/personal-portfolio"
              liveUrl="#"
              color="yellow"
            />



            <ProjectCard
              title="Sinhala OCR & Document Converter"
                description="A specialized OCR tool designed to digitize Sinhala documents, converting scanned PDFs and images
                into editable Word (.docx) files. It utilizes a customized Tesseract engine optimized for Sinhala Unicode to 
                accurately extract text from scanned letters and exam papers."

              tech={["Next.js", "Python", "FastAPI", "Tesseract OCR", "Docker"]}
              images={[
                "/images/projects/sinhala-document-converter/ocr-image1.png", 
                "/images/projects/sinhala-document-converter/ocr-image2.png", 
                "/images/projects/sinhala-document-converter/ocr-image3.png", 
              ]}
              codeUrl="https://github.com/RavinAr1/Sinhala-OCR-Converter"
              liveUrl="https://sinhala-ocr-converter.vercel.app/" 
              color="pink"
            />


          </div>
        </section>







        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
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
          <p>© 2025 Ravindu Ariyarathne. All rights reserved.</p>
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



// --- CONTACT INFO COMPONENT ---
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


// --- CONTACT FORM COMPONENT ---
function ContactForm() {
  const [isHovered, setIsHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // EmailJS Configuration
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    if (!formRef.current) return

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
            variant: "default",
          })
          formRef.current?.reset()
        },
        (error) => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          })
          console.error("FAILED...", error.text)
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-8 p-8 rounded-3xl border transition-all duration-500 bg-white/[0.02] backdrop-blur-[4px]"
      style={{
        borderColor: isHovered ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.05)",
        boxShadow: isHovered ? "0 0 30px rgba(6, 182, 212, 0.2)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Input name="user_name" placeholder="Name" required />
      <Input name="user_email" type="email" placeholder="Email" required />
      
      <textarea
        name="message"
        required
        rows={4}
        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 
        transition-colors text-white placeholder:text-gray-600 resize-none"
        placeholder="Message"
      />
      <button 
        type="submit"
        disabled={isSubmitting}
        className="px-10 py-4 border border-white/20 hover:bg-cyan-500/10 hover:border-cyan-500 
        hover:text-cyan-400 text-white rounded-full font-light transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}




//Skills Carousel
function InfiniteMarquee() {
  const skills = [ 
    // Frontend
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    // Backend
    "Node.js", "Java", "Spring Boot", "Python", "FastAPI", "Flask", 
    // Data & Communication
    "MySQL", "REST API", , "Machine Learning", 
    // DevOps & Tools
    "Docker", "Git"]
  const duplicatedSkills = [...skills, ...skills, ...skills]

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -2000] }}
        transition={{ x: { repeat: Number.POSITIVE_INFINITY, repeatType: "loop", duration: 40, ease: "linear" } }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full 
          whitespace-nowrap text-gray-400 font-light tracking-wide">
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// --- PROJECT CARD COMPONENT ---
// PROJECT CARD
function ProjectCard({ title, description, tech, images, codeUrl, liveUrl, color }: any) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // --- COLOR CONFIGURATION ---
  const colorVariants: any = {
    green: {
      glow: "rgba(34, 197, 94, 0.4)", // green-500
      border: "rgba(34, 197, 94, 0.5)",
      pill: "bg-green-500/[0.05] border-green-500/20 text-green-200/80",
      title: "#4ade80", // green-400
      indicator: "bg-green-400"
    },
    blue: {
      glow: "rgba(59, 130, 246, 0.4)", // blue-500
      border: "rgba(59, 130, 246, 0.5)",
      pill: "bg-blue-500/[0.05] border-blue-500/20 text-blue-200/80",
      title: "#60a5fa", // blue-400
      indicator: "bg-blue-400"
    },
    purple: {
      glow: "rgba(168, 85, 247, 0.4)", // purple-500
      border: "rgba(168, 85, 247, 0.5)",
      pill: "bg-purple-500/[0.05] border-purple-500/20 text-purple-200/80",
      title: "#c084fc", // purple-400
      indicator: "bg-purple-400"
    },
    orange: {
      glow: "rgba(249, 115, 22, 0.4)", // orange-500
      border: "rgba(249, 115, 22, 0.5)",
      pill: "bg-orange-500/[0.05] border-orange-500/20 text-orange-200/80",
      title: "#fb923c", // orange-400
      indicator: "bg-orange-400"
    },
    pink: {
      glow: "rgba(236, 72, 153, 0.4)", // pink-500
      border: "rgba(236, 72, 153, 0.5)",
      pill: "bg-pink-500/[0.05] border-pink-500/20 text-pink-200/80",
      title: "#f472b6", // pink-400
      indicator: "bg-pink-400"
    },
    red: {
      glow: "rgba(239, 68, 68, 0.4)", // red-500
      border: "rgba(239, 68, 68, 0.5)",
      pill: "bg-red-500/[0.05] border-red-500/20 text-red-200/80",
      title: "#f87171", // red-400
      indicator: "bg-red-400"
    },
    yellow: {
      glow: "rgba(234, 179, 8, 0.4)", // yellow-500
      border: "rgba(234, 179, 8, 0.5)",
      pill: "bg-yellow-500/[0.05] border-yellow-500/20 text-yellow-200/80",
      title: "#facc15", // yellow-400
      indicator: "bg-yellow-400"
    }
  }



  //Default to blue if color not found
  const theme = colorVariants[color] || colorVariants.blue

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div 
      className="grid md:grid-cols-2 gap-10 rounded-3xl overflow-hidden p-6 md:p-8 transition-all duration-500 
      bg-white/[0.02] backdrop-blur-[4px] border border-white/5"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered 
          ? `0 20px 60px -10px rgba(0,0,0,0.5), 0 0 40px ${theme.glow}` 
          : "none",
        borderColor: isHovered ? theme.border : "rgba(255, 255, 255, 0.05)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative aspect-video bg-black/40 rounded-2xl overflow-hidden">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        
        {/* Progress Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentImage 
                  ? `${theme.indicator} w-8` // Dynamic Indicator Color
                  : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>


      {/* Project Details */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-light tracking-tight text-white transition-colors"
              style={{ color: isHovered ? theme.title : "white" }} // Dynamic Title Color
          >
            {title}
          </h3>
        </div>
        
        <p className="text-gray-400 mb-8 leading-relaxed font-light">{description}</p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tech.map((item: string) => (
            <span
              key={item}
              className={`px-4 py-1.5 border rounded-full text-sm font-light transition-colors 
                duration-300 ${isHovered ? theme.pill : "bg-white/[0.02] border-white/10 text-gray-400"}`} // Dynamic Pill Style
            >
              {item}
            </span>
          ))}
        </div>

      {/* Buttons */}
        <div className="flex gap-4 mt-auto">
          {/* View Code */}
          <a
            href={codeUrl}
            target="_blank"
            className="flex-1 px-6 py-3 border border-white/10 hover:bg-white hover:text-black text-center 
            rounded-lg font-light transition-all duration-300 text-sm tracking-wide text-white"
          >
            View Code
          </a>

          {/* Live Demo - if liveUrl exists and not a '#' */}
          {liveUrl && liveUrl !== "#" && (
            <a
              href={liveUrl}
              target="_blank"
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-center 
              rounded-lg font-normal transition-all duration-300 text-sm tracking-wide"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
    
  )
}




// ---  TIMELINE  ---
function TimelineItem({ title, subtitle, date }: { title: string, subtitle: string, date: string }) {
  return (
    <div className="relative group">
      {/* Dot on the line */}
      <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-2 border-cyan-500/50 bg-[#020617] 
      group-hover:bg-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-300" />
      
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors duration-300">
        <h4 className="text-xl font-medium text-white mb-2">{title}</h4>
        <p className="text-cyan-200/80 mb-1 font-light">{subtitle}</p>
        <p className="text-gray-500 text-sm font-light tracking-wide">{date}</p>
      </div>
    </div>
  )
}



// --- FORM INPUT COMPONENT ---
function Input({ placeholder, name, type = "text", required = false }: { placeholder: string, name: string, type?: string, required?: boolean }) {
  return (
    <input
      type={type}
      name={name}
      required={required}
      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-cyan-500 
      transition-colors text-white placeholder:text-gray-600"
      placeholder={placeholder}
    />
  )
}