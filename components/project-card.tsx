"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { GhostButton } from "./ghost-button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
}

interface ProjectCardProps {
  project: Project
  index: number
  totalProjects: number
  scrollProgress: number
}

export function ProjectCard({ project, index, totalProjects, scrollProgress }: ProjectCardProps) {
  const [transform, setTransform] = useState("")
  const [opacity, setOpacity] = useState(1)
  const [zIndex, setZIndex] = useState(totalProjects - index)

  useEffect(() => {

    const projectSectionStart = 0.25
    const projectSectionEnd = 0.75
    const projectSectionProgress = (scrollProgress - projectSectionStart) / (projectSectionEnd - projectSectionStart)


    const cardProgress = projectSectionProgress * totalProjects - index

    if (cardProgress < 0) {
      // Card is stacked
      const stackOffset = index * 8
      setTransform(`translateY(${stackOffset}px) translateZ(${-index * 20}px) rotateX(2deg)`)
      setOpacity(1 - index * 0.1)
      setZIndex(totalProjects - index)
    } else if (cardProgress >= 0 && cardProgress < 1) {

      // Card is in focus
      const progress = cardProgress
      const translateY = progress * -150
      const translateZ = progress * 500
      const scale = 1 - progress * 0.5
      const rotation = progress * -10

      setTransform(`translateY(${translateY}vh) translateZ(${translateZ}px) scale(${scale}) rotateX(${rotation}deg)`)
      setOpacity(1 - progress)
      setZIndex(totalProjects + 10)
    } else {
      // Card has been scrolled past
      setTransform(`translateY(-200vh) translateZ(1000px) scale(0.2)`)
      setOpacity(0)
      setZIndex(0)
    }
  }, [scrollProgress, index, totalProjects])

  return (
    <div
      className="absolute inset-0 transition-all duration-700 ease-out"
      style={{
        transform,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-full h-full bg-card rounded-none border border-white/10 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_100px_-20px_rgba(255,255,255,0.1)] group">
        {/* Project Image */}
        <div className="relative w-full h-1/2 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Project Content */}
        <div className="p-8 flex flex-col justify-between h-1/2">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs tracking-wider uppercase border border-white/20 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <GhostButton variant="small">
                <ExternalLink className="w-4 h-4 mr-2" />
                View
              </GhostButton>
              <GhostButton variant="small">
                <Github className="w-4 h-4 mr-2" />
                Code
              </GhostButton>
            </div>
          </div>
        </div>

        {/* Project Number */}
        <div className="absolute top-4 right-4 font-serif text-6xl font-bold text-white/5">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}
