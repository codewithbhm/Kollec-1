"use client"

import React from "react"

import { executeQuery } from "@/lib/db"
import type { Category } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Users, Award } from "lucide-react"

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await executeQuery<Category>(`
      SELECT * FROM categories 
      ORDER BY post_count DESC
      LIMIT 4
    `)

    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function CategoriesSection() {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kateqoriyalar</h2>
            <p className="text-gray-600 dark:text-gray-400">Məlumatlar yüklənir...</p>
          </div>
        </div>
      </section>
    )
  }

  const categoryIcons = [
    { icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { icon: GraduationCap, color: "from-green-500 to-green-600" },
    { icon: Users, color: "from-purple-500 to-purple-600" },
    { icon: Award, color: "from-orange-500 to-orange-600" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -left-64 bottom-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">MƏZMUN KATEQORİYALARI</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Kateqoriyalar</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Məqalələri kateqoriyalara görə araşdırın və sizə lazım olan məlumatları tapın
          </p>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mt-4 mx-auto"></div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/news?category=${category.slug}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg dark:shadow-gray-900/20 overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 transform group-hover:scale-95 transition-transform duration-300 rounded-lg"></div>

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${categoryIcons[index].color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}
                      >
                        {React.createElement(categoryIcons[index].icon, { className: "h-8 w-8 text-white" })}
                      </div>

                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.nameAz || category.name}
                      </h3>

                      <Badge
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none"
                      >
                        {category.postCount} məqalə
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
