"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  color: "green" | "blue"
  image: string
}

interface GlassBlockProps {
  project: Project
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  index: number
}

export default function GlassBlock({ project, isHovered, onHover, onLeave, index }: GlassBlockProps) {
  const glowColor = project.color === "green" ? "rgba(34, 197, 94, 0.4)" : "rgba(59, 130, 246, 0.4)"

  const borderColor = project.color === "green" ? "border-green-500/50" : "border-blue-500/50"

  return (
    <div
      className={`glass-block rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
        index === 0 ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      style={{
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${glowColor}`
          : "0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)",
        borderColor: isHovered
          ? project.color === "green"
            ? "rgba(34, 197, 94, 0.5)"
            : "rgba(59, 130, 246, 0.5)"
          : undefined,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
          <ExternalLink
            className={`w-5 h-5 transition-all duration-300 ${
              isHovered ? "text-slate-100 translate-x-1 -translate-y-1" : "text-slate-500"
            }`}
          />
        </div>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                isHovered
                  ? project.color === "green"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700/50"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
