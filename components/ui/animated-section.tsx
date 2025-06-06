"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useApp } from "@/app/providers"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "rotate"
  delay?: number
  duration?: number
  stagger?: boolean
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
  stagger = false,
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  })
  const { state } = useApp()

  if (!state.animationsEnabled) {
    return <div className={className}>{children}</div>
  }

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
  }

  const containerVariants = stagger
    ? {
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }
    : {}

  return (
    <motion.div
      ref={elementRef}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={stagger ? containerVariants : animations[animation]}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
