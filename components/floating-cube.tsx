"use client"

interface FloatingCubeProps {
  icon: string
  name: string
  delay: number
  position: number
}

export default function FloatingCube({ icon, name, delay, position }: FloatingCubeProps) {
  // Define positions for the cubes
  const positions = [
    { top: "20%", left: "15%", rotate: -15 },
    { top: "25%", right: "18%", rotate: 10 },
    { top: "60%", left: "10%", rotate: 5 },
  ]

  const pos = positions[position] || positions[0]

  return (
    <div
      className="absolute glass-block p-4 rounded-xl bobbing"
      style={{
        top: pos.top,
        left: pos.left,
        right: pos.right,
        transform: `rotate(${pos.rotate}deg)`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl" role="img" aria-label={name}>
          {icon}
        </span>
        <span className="text-xs text-slate-400 font-medium">{name}</span>
      </div>
    </div>
  )
}
