"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RoutesModal } from "@/components/ui/routes-modal"
import { Home, Search, BookOpen, GraduationCap, ArrowLeft, RefreshCw, MapPin, ChevronRight, Route } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Add subtle parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll(".parallax-element")
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      parallaxElements.forEach((el) => {
        const element = el as HTMLElement
        const speed = Number.parseFloat(element.getAttribute("data-speed") || "0.05")
        const moveX = (x - 0.5) * speed * 100
        const moveY = (y - 0.5) * speed * 100
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const quickLinks = [
    {
      href: "/",
      icon: Home,
      title: "Ana Səhifə",
      description: "Əsas səhifəyə qayıt",
    },
    {
      href: "/colleges",
      icon: GraduationCap,
      title: "Kolleclər",
      description: "Bütün kollecləri gör",
    },
    {
      href: "/news",
      icon: BookOpen,
      title: "Xəbərlər",
      description: "Təhsil xəbərləri",
    },
    {
      href: "/contact",
      icon: MapPin,
      title: "Əlaqə",
      description: "Bizimlə əlaqə saxla",
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-blob parallax-element"
          data-speed="0.03"
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 parallax-element"
          data-speed="0.05"
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000 parallax-element"
          data-speed="0.02"
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20"></div>

      {/* Decorative Elements */}
      <div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-floating opacity-60 parallax-element"
        data-speed="0.1"
      ></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-indigo-400 rounded-full animate-floating-slow opacity-40 parallax-element"
        data-speed="0.08"
      ></div>
      <div
        className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-floating-fast opacity-50 parallax-element"
        data-speed="0.12"
      ></div>
      <div
        className="absolute bottom-40 right-10 w-5 h-5 bg-pink-400 rounded-full animate-floating opacity-30 parallax-element"
        data-speed="0.07"
      ></div>

      {/* Abstract Shapes */}
      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-300/30 rounded-full animate-rotating opacity-30 parallax-element"
        data-speed="0.04"
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-indigo-300/30 rounded-full animate-rotating opacity-20 parallax-element"
        data-speed="0.06"
        style={{ animationDirection: "reverse" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Number with Animation */}
        <div className="mb-8 relative">
          <div className="animate-bounce-in-top">
            <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none select-none">404</h1>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl md:text-[12rem] font-bold text-blue-600/10 blur-sm animate-pulse">404</div>
          </div>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full animate-scale-in"></div>
        </div>

        {/* Main Content Card */}
        <Card className="glass-effect border-0 shadow-2xl animate-fade-in-up mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-white/5 dark:bg-black/5"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-10 animate-pulse"></div>

          <CardContent className="p-8 md:p-12 relative">
            <div className="space-y-8">
              {/* Error Message */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Səhifə Tapılmadı</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Axtardığınız səhifə mövcud deyil və ya köçürülüb. Narahat olmayın, sizə kömək etmək üçün buradayıq!
                </p>
              </div>

              {/* Illustration */}
              <div className="animate-fade-in-up max-w-xs mx-auto" style={{ animationDelay: "0.3s" }}>
                <div className="relative h-40 w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-16 h-16 text-blue-500/50 dark:text-blue-400/50 animate-floating" />
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div
                className={`animate-fade-in-up transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}
                style={{ animationDelay: "0.4s" }}
              >
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder="Axtardığınızı buradan tapın..."
                      className="w-full pl-10 pr-24 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      aria-label="Axtarış"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                    >
                      Axtar
                    </Button>
                  </div>
                </form>
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                >
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Ana Səhifəyə Qayıt
                  </Link>
                </Button>

                {/* Routes Button */}
                <RoutesModal>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                  >
                    <Route className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Mövcud Səhifələr
                  </Button>
                </RoutesModal>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="group border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-slide-in-left" />
                  Geri Qayıt
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.reload()}
                  className="group border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Yenilə
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center">
            <span className="w-12 h-1 bg-blue-500/50 rounded-full mr-3"></span>
            Populyar Bölmələr
            <span className="w-12 h-1 bg-blue-500/50 rounded-full ml-3"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Card
                key={link.href}
                className="card-hover glass-effect border-0 group animate-scale-in overflow-hidden"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative">
                  <Link href={link.href} className="block">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{link.description}</p>
                    <div className="flex items-center justify-center text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Keçid et</span>
                      <ChevronRight className="w-3 h-3 ml-1 group-hover:animate-bounce-right" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div
          className="mt-6 text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up"
          style={{ animationDelay: "1.1s" }}
        >
          <p>
            Bu demo tətbiqində yalnız bir neçə səhifə mövcuddur. "Mövcud Səhifələr" düyməsini klikləyərək onları görə
            bilərsiniz.
          </p>
          <p className="mt-1">
            (Only a few pages are implemented in this demo application. Click the "Available Pages" button to see them.)
          </p>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <p className="text-gray-500 dark:text-gray-400">
            Hələ də kömək lazımdır?{" "}
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium relative inline-block group"
            >
              <span>Bizimlə əlaqə saxlayın</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
