"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20"></div>

      <div className="relative z-10 text-center">
        <div className="animate-fade-in-up">
          <LoadingSpinner size="lg" />
          <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white animate-pulse">Yüklənir...</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Məlumatlar hazırlanır</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-floating opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-indigo-400 rounded-full animate-floating-slow opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-floating-fast opacity-50"></div>
      <div className="absolute bottom-40 right-10 w-5 h-5 bg-pink-400 rounded-full animate-floating opacity-30"></div>
    </div>
  )
}
