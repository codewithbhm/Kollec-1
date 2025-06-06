"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, Calendar, User, Share2, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import type { Article } from "@/lib/types"

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchArticle(resolvedParams.id)
    }
  }, [resolvedParams])

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data)
      } else if (response.status === 404) {
        notFound()
      }
    } catch (error) {
      console.error("Error fetching article:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/news">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Xəbərlərə qayıt
          </Link>
        </Button>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-blue-200">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {article.category}
                    </Badge>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {new Date(article.created_at).toLocaleDateString("az-AZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">5 dəq oxu</span>
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Share2 className="w-4 h-4 mr-2" />
                      Paylaş
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    {article.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.article>

          {/* Related Articles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Oxşar Məqalələr
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="card-hover">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">
                      Təhsil
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      Universitet seçimi üçün vacib məsləhətlər
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Doğru universitet seçimi gələcək karyeranız üçün çox vacibdir...
                    </p>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/news/${i + 10}`}>
                        Oxu
                        <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
