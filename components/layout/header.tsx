"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Facebook, Instagram, Home, Search, User, Moon, Sun, Bell, X } from "lucide-react"
import { useApp } from "@/app/providers"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Ana Səhifə", nameEn: "Home", href: "/", icon: Home },
  { name: "Kolleclər", nameEn: "Colleges", href: "/colleges" },
  { name: "Kollecə Qəbul", nameEn: "College Admission", href: "/admission" },
  { name: "Təhsil Xəritəsi", nameEn: "Education Map", href: "/education-map" },
  { name: "İmtahan Nəticələri", nameEn: "Exam Results", href: "/exam-results" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { state, dispatch } = useApp()

  // Enhanced scroll effect with better performance
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    })
  }

  return (
    <header className="relative z-50">
      {/* Mobile-Optimized Top Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-2 text-xs sm:text-sm">
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center space-x-2 flex-shrink-0">
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200" />
              <span className="text-blue-100 text-xs">Son xəbər:</span>
            </div>
            {/* Mobile-friendly announcement */}
            <div className="flex-1 overflow-hidden">
              <div className="sm:hidden">
                <span className="font-medium text-xs">2025 qəbul kampaniyası başladı!</span>
              </div>
              <div className="hidden sm:block">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 25,
                    ease: "linear",
                  }}
                  className="whitespace-nowrap"
                >
                  <span className="font-medium">
                    2025 qəbul kampaniyası başladı - Ən yaxşı kolleclərdə yerinizi təmin edin!
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <Link
              href="https://facebook.com"
              className="hover:text-blue-200 transition-colors p-1"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-blue-200 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Hero Banner */}
      <div className="animated-gradient text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-cover bg-center"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-4 sm:mb-6"
              >
                <span className="block text-blue-200 text-sm sm:text-base lg:text-lg font-medium mb-2">
                  2025 Qəbul Kampaniyası
                </span>
                kollec və bakalavr diplomu ilə <span className="text-yellow-300 font-bold">qəbul</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
              >
                <div className="glass-effect rounded-full px-4 sm:px-6 py-2 sm:py-3 group hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:animate-bounce flex-shrink-0" />
                    <div className="text-center sm:text-left">
                      <div className="text-xs text-blue-200">Dərhal zəng edin</div>
                      <div className="text-lg sm:text-xl font-bold">077 210 0 211</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto text-sm sm:text-base"
                  asChild
                >
                  <Link href="/contact">Pulsuz Məsləhət</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full lg:w-1/2 max-w-sm mx-auto"
            >
              <div className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2">
                    ✓ İMTAHANSIZ
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">QİYABİ TƏHSİL</h2>
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-blue-200 mb-3 sm:mb-4">
                  MÜHASİBAT UÇOTU
                </h3>
                <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-base">2 İL</div>
                    <div className="text-blue-200">Müddət</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-base">DIPLOM</div>
                    <div className="text-blue-200">Sənəd</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Navigation */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-gray-900 dark:bg-gray-900",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile-Optimized Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm sm:text-lg">K</span>
              </div>
              <span
                className={cn(
                  "font-bold text-lg sm:text-xl transition-colors duration-300",
                  scrolled ? "text-blue-600 dark:text-blue-400" : "text-white",
                )}
              >
                KOLLEC.AZ
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                    pathname === item.href
                      ? scrolled
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-white bg-white/10"
                      : scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                >
                  {state.language === "az" ? item.name : item.nameEn}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile-Optimized Right side actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Action buttons - Responsive sizing */}
              {[
                { icon: Search, action: () => setSearchOpen(!searchOpen), label: "Axtar", showOnMobile: true },
                { icon: User, action: () => (window.location.href = "/login"), label: "Giriş", showOnMobile: false },
                { icon: state.theme === "dark" ? Sun : Moon, action: toggleTheme, label: "Tema", showOnMobile: false },
              ].map((btn, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={btn.action}
                  className={cn(
                    "rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10",
                    !btn.showOnMobile && "hidden sm:flex",
                    scrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                  aria-label={btn.label}
                >
                  <btn.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              ))}

              {/* Mobile menu button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10",
                      scrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        : "text-gray-300 hover:text-white",
                    )}
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
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
                          "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                          pathname === item.href
                            ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                        )}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{state.language === "az" ? item.name : item.nameEn}</span>
                      </Link>
                    ))}

                    {/* Mobile-only actions in menu */}
                    <div className="border-t pt-4 space-y-2">
                      <button
                        onClick={() => {
                          window.location.href = "/login"
                          setIsOpen(false)
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 w-full transition-all duration-300"
                      >
                        <User className="w-5 h-5" />
                        <span>Giriş</span>
                      </button>
                      <button
                        onClick={() => {
                          toggleTheme()
                          setIsOpen(false)
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 w-full transition-all duration-300"
                      >
                        {state.theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span>Tema</span>
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-Optimized Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full glass-effect shadow-xl z-40 border-b"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Kollec, proqram axtar..."
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              {/* Mobile-friendly search suggestions */}
              <div className="max-w-2xl mx-auto mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">Populyar axtarışlar:</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {["Kompüter", "Biznes", "Mühəndislik", "Tibb"].map((term) => (
                    <button
                      key={term}
                      className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
