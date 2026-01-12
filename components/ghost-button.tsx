"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "small" | "icon"
}

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "px-8 py-4 text-sm tracking-[0.2em] uppercase",
      secondary: "px-8 py-4 text-sm tracking-[0.2em] uppercase",
      small: "px-4 py-2 text-xs tracking-[0.15em] uppercase",
      icon: "p-3",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative group border border-white/30 bg-transparent text-white transition-all duration-500",
          "hover:bg-white hover:text-black hover:border-white",
          "hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.2)]",
          "active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "overflow-hidden",
          variants[variant],
          className,
        )}
        {...props}
      >
        {/* Glow effect on hover */}
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white transition-all duration-500" />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center">{children}</span>

        {/* Inner glow */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
      </button>
    )
  },
)

GhostButton.displayName = "GhostButton"
