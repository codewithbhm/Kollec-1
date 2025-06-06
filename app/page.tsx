"use client"

import { Suspense } from "react"
import { NewsSection } from "@/components/home/news-section"
import { CollegesSection } from "@/components/home/colleges-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ContactSection } from "@/components/home/contact-section"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-grid-white/10"></div>

        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Təhsil Gələcəyinizi <span className="text-blue-300">Bizimlə</span> Qurun
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-10"
            >
              Azərbaycanda kollec və universitet qəbulu üçün ən etibarlı məsləhət platforması
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg">
                <Link href="/colleges" className="flex items-center">
                  Kolleclərə bax
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Link href="/admission">Qəbul prosesi</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/90"></div>
          <div className="container mx-auto px-4 py-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-blue-200">Kollec və Universitet</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="bg-indigo-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">200+</h3>
                <p className="text-blue-200">Təhsil Proqramı</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">5000+</h3>
                <p className="text-blue-200">Məzun Tələbə</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <NewsSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CollegesSection />
      </Suspense>

      <CategoriesSection />

      <ContactSection />
    </div>
  )
}
