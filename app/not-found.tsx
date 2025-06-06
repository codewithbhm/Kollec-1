"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, BookOpen, GraduationCap, ArrowLeft, RefreshCw, MapPin } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
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
      href: "/articles",
      icon: BookOpen,
      title: "Məqalələr",
      description: "Təhsil məqalələri",
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Number with Animation */}
        <div className="mb-8 animate-bounce-in-top">
          <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none select-none">404</h1>
          <div className="relative">
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-600/10 blur-sm animate-pulse">
              404
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="glass-effect border-0 shadow-2xl animate-fade-in-up mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              {/* Error Message */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Səhifə Tapılmadı</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Axtardığınız səhifə mövcud deyil və ya köçürülüb. Narahat olmayın, sizə kömək etmək üçün buradayıq!
                </p>
              </div>

              {/* Search Bar */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Axtardığınızı buradan tapın..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <Button type="submit" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
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
                <Button asChild size="lg" className="group">
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Ana Səhifəyə Qayıt
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.history.back()} className="group">
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-slide-in-left" />
                  Geri Qayıt
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.reload()} className="group">
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Yenilə
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Populyar Bölmələr</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Card
                key={link.href}
                className="card-hover glass-effect border-0 group animate-scale-in"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <Link href={link.href} className="block">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <p className="text-gray-500 dark:text-gray-400">
            Hələ də kömək lazımdır?{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Bizimlə əlaqə saxlayın
            </Link>
          </p>
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
