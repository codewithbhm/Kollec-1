"use client"

import { Suspense } from "react"
import { NewsSection } from "@/components/home/news-section"
import { CollegesSection } from "@/components/home/colleges-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ContactSection } from "@/components/home/contact-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, GraduationCap, Users, Star, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Better Psychology */}
      <section className="relative overflow-hidden section-padding">
        {/* Improved background with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 bg-cover bg-center"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Enhanced animated shapes with better performance */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full animate-blob animation-delay-4000"></div>

        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Improved headline with better hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-hierarchy-1 text-white mb-6">
                Təhsil Gələcəyinizi{" "}
                <span className="relative">
                  <span className="gradient-text bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    Bizimlə
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
                </span>{" "}
                Qurun
              </h1>
            </motion.div>

            {/* Enhanced value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Azərbaycanda kollec və universitet qəbulu üçün{" "}
              <span className="font-semibold text-white">ən etibarlı</span> və{" "}
              <span className="font-semibold text-white">ən təcrübəli</span> məsləhət platforması
            </motion.p>

            {/* Improved CTA buttons with better psychology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="btn-primary group relative overflow-hidden" asChild>
                <Link href="/colleges" className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Kolleclərə bax
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group"
                asChild
              >
                <Link href="/admission" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Qəbul prosesi
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap justify-center items-center gap-8 text-blue-200 text-sm"
            >
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.9/5 reytinq</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>10,000+ məmnun tələbə</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>15+ il təcrübə</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced stats section with better visual hierarchy */}
        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/50 to-blue-900/90"></div>
          <div className="container mx-auto container-padding relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: GraduationCap, number: "50+", label: "Kollec və Universitet", color: "blue" },
                { icon: BookOpen, number: "200+", label: "Təhsil Proqramı", color: "indigo" },
                { icon: TrendingUp, number: "95%", label: "Uğur Nisbəti", color: "purple" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="glass-effect rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`bg-${stat.color}-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`h-8 w-8 text-${stat.color}-300`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {stat.number}
                  </h3>
                  <p className="text-blue-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced sections with better loading states */}
      <Suspense
        fallback={
          <div className="section-padding">
            <div className="container mx-auto container-padding">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="loading-shimmer h-64 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <NewsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="section-padding bg-white">
            <div className="container mx-auto container-padding">
              <div className="loading-shimmer h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="loading-shimmer h-80 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <CollegesSection />
      </Suspense>

      <CategoriesSection />

      <ContactSection />
    </div>
  )
}
