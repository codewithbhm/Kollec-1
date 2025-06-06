"use client"

import { executeQuery } from "@/lib/db"
import type { Article } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

async function getLatestNews(): Promise<Article[]> {
  try {
    const articles = await executeQuery<
      Article & {
        category_name: string
        author_name: string
      }
    >(`
      SELECT a.*, 
             c.name as category_name,
             u.name as author_name
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.published = true
      ORDER BY a.created_at DESC
      LIMIT 6
    `)

    return articles
  } catch (error) {
    console.error("Error fetching news:", error)
    return []
  }
}

export async function NewsSection() {
  const articles = await getLatestNews()

  if (!articles || articles.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">İmtahan nəticələri</h2>
            <p className="text-gray-600 dark:text-gray-400">Məlumatlar yüklənir...</p>
          </div>
        </div>
      </section>
    )
  }

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
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute -left-64 -top-64 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
      <div className="absolute -right-64 -bottom-64 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">XƏBƏRLƏR VƏ MƏLUMATLAR</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">İmtahan nəticələri</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mt-4"></div>
          </div>
          <Link
            href="/news"
            className="group flex items-center text-blue-600 dark:text-blue-400 font-medium mt-4 md:mt-0 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Hamısını gör
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div key={article.id} variants={item} className="h-full">
              <Card
                className={cn("overflow-hidden h-full card-hover", index === 0 ? "md:col-span-2 lg:col-span-1" : "")}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg?height=200&width=400"}
                    alt={article.titleAz || article.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="glass-effect text-white border-none">
                      {article.category_name || "Xəbər"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(article.createdAt).toLocaleDateString("az-AZ")}</span>
                      <span className="mx-2">•</span>
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{article.views || 0}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-lg group">
                    <Link
                      href={`/news/${article.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {article.titleAz || article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 text-sm">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author_name || "Admin"}</span>
                    </div>
                    <Link
                      href={`/news/${article.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-sm"
                    >
                      Ətraflı
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
