"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Facebook, Instagram, Home, Search, User, Moon, Sun } from "lucide-react"
import { useApp } from "@/app/providers"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Ana Səhifə", nameEn: "Home", href: "/", icon: Home },
  { name: "Kolleclər", nameEn: "Colleges", href: "/colleges" },
  { name: "Kollecə Qəbul", nameEn: "College Admission", href: "/admission" },
  { name: "Əlavə Qəbul", nameEn: "Additional Admission", href: "/additional-admission" },
  { name: "Təhsil Xəritəsi", nameEn: "Education Map", href: "/education-map" },
  { name: "İmtahan Nəticələri", nameEn: "Exam Results", href: "/exam-results" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { state, dispatch } = useApp()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    })
  }

  return (
    <header className="relative z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 overflow-hidden">
            <span className="hidden sm:inline">June 6, 2025</span>
            <motion.span
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 20,
                ease: "linear",
              }}
              className="whitespace-nowrap"
            >
              Son xəbər: əvvəl Bakı, sonra İsmayıllı - Gözlənilməz qalibin hekayəsi
            </motion.span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="https://facebook.com" className="hover:text-blue-200 transition-colors">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="https://instagram.com" className="hover:text-blue-200 transition-colors">
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="animated-gradient text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center"></div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold mb-4"
              >
                kollec və bakalavr diplomu ilə qəbul
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <div className="glass-effect rounded-full px-6 py-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span className="text-xl font-bold">077 210 0 211</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:w-1/2 text-center"
            >
              <div className="glass-effect rounded-lg p-6 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-2">İMTAHANSIZ</h2>
                <h3 className="text-lg md:text-xl mb-2">QİYABİ TƏHSİL</h3>
                <h4 className="text-base md:text-lg">MÜHASİBAT UÇOTU</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md" : "bg-gray-900 dark:bg-gray-900",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span
                className={cn(
                  "font-bold text-xl transition-colors",
                  scrolled ? "text-blue-600 dark:text-blue-400" : "text-white",
                )}
              >
                KOLLEC.AZ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors relative group",
                    pathname === item.href
                      ? scrolled
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-white"
                      : scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        : "text-gray-300 hover:text-white",
                  )}
                >
                  {state.language === "az" ? item.name : item.nameEn}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Search button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "rounded-full transition-colors",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-gray-300 hover:text-white",
                )}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full transition-colors",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-gray-300 hover:text-white",
                )}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "rounded-full transition-colors",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-gray-300 hover:text-white",
                )}
              >
                {state.theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Mobile menu button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full transition-colors",
                      scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        : "text-gray-300 hover:text-white",
                    )}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 glass-effect">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                        )}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{state.language === "az" ? item.name : item.nameEn}</span>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-x-0 top-full glass-effect shadow-lg z-40"
        >
          <div className="container mx-auto p-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Axtar..."
                className="w-full p-3 pl-10 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-2 rounded-full"
              >
                <span className="sr-only">Close search</span>
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
