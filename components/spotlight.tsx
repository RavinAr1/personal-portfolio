"use client"

import { useEffect, useRef } from "react"

interface SpotlightProps {
  mousePosition: { x: number; y: number }
}

export function Spotlight({ mousePosition }: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mouse-x", `${mousePosition.x}px`)
      spotlightRef.current.style.setProperty("--mouse-y", `${mousePosition.y}px`)
    }
  }, [mousePosition])

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)`,
      }}
    />
  )
}
