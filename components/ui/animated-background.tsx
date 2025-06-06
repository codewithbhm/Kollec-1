"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: "gradient" | "morphing" | "floating" | "grid"
}

export function AnimatedBackground({ children, className, variant = "gradient" }: AnimatedBackgroundProps) {
  const variants = {
    gradient: "animated-gradient",
    morphing: "morphing-shape animated-gradient-purple",
    floating: "floating",
    grid: "bg-grid-white/5",
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {variant === "morphing" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 morphing-shape animated-gradient opacity-20 floating-slow" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 morphing-shape animated-gradient-purple opacity-15 floating animation-delay-2000" />
            <div className="absolute bottom-1/4 right-1/3 w-32 h-32 morphing-shape animated-gradient opacity-10 floating-fast animation-delay-4000" />
          </>
        )}

        {variant === "floating" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating-slow animation-delay-2000" />
            <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating-fast animation-delay-4000" />
          </>
        )}

        {variant === "gradient" && <div className="absolute inset-0 animated-gradient opacity-90" />}

        {variant === "grid" && <div className="absolute inset-0 bg-grid-white/5" />}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
