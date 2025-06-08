"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {/* Enhanced spinner with better animation */}
      <div className="relative">
        <div
          className={cn("animate-spin rounded-full border-2 border-gray-200 dark:border-gray-700", sizeClasses[size])}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 dark:border-t-blue-400",
              sizeClasses[size],
            )}
          />
        </div>

        {/* Pulse effect */}
        <div className={cn("absolute inset-0 rounded-full bg-blue-600/20 animate-ping", sizeClasses[size])} />
      </div>

      {/* Loading text with better typography */}
      {text && <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>}
    </div>
  )
}
