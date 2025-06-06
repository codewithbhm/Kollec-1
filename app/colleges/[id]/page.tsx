"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, MapPin, Users, Phone, Mail, Globe, Star, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import type { College } from "@/lib/types"

interface CollegePageProps {
  params: Promise<{ id: string }>
}

export default function CollegePage({ params }: CollegePageProps) {
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchCollege(resolvedParams.id)
    }
  }, [resolvedParams])

  const fetchCollege = async (id: string) => {
    try {
      const response = await fetch(`/api/colleges/${id}`)
      if (response.ok) {
        const data = await response.json()
        setCollege(data)
      } else if (response.status === 404) {
        notFound()
      }
    } catch (error) {
      console.error("Error fetching college:", error)
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

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/colleges">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kolleclərə qayıt
          </Link>
        </Button>
      </div>

      {/* College Header */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
                <div className="flex items-center text-blue-200 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{college.location}</span>
                </div>
              </div>
              <Badge variant={college.type === "public" ? "default" : "secondary"} className="text-lg px-4 py-2">
                {college.type === "public" ? "Dövlət Kolleci" : "Özəl Kollec"}
              </Badge>
            </div>

            <p className="text-xl text-blue-100 leading-relaxed">{college.description}</p>
          </motion.div>
        </div>
      </section>

      {/* College Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Kollec Haqqında
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {college.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </CardContent>
              </Card>

              {/* Programs */}
              <Card>
                <CardHeader>
                  <CardTitle>Təhsil Proqramları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["İnformatika", "Biznes İdarəetməsi", "Maliyyə", "Hüquq", "Tibb", "Mühəndislik"].map((program) => (
                      <div
                        key={program}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900">{program}</h4>
                        <p className="text-sm text-gray-600 mt-1">4 il, Bakalavr dərəcəsi</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Admission Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Qəbul Şərtləri</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Orta təhsil sənədi (Attestat)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>DİM imtahanından minimum 400 bal</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Şəxsiyyət vəsiqəsinin surəti</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>6 ədəd 3x4 ölçülü fotoşəkil</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistika</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      <span>Tələbə sayı</span>
                    </div>
                    <span className="font-semibold">{college.student_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      <span>Reytinq</span>
                    </div>
                    <span className="font-semibold">4.5/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      <span>Təsis ili</span>
                    </div>
                    <span className="font-semibold">1995</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Əlaqə Məlumatları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-blue-500" />
                    <span>+994 12 123 45 67</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                    <span>info@{college.name.toLowerCase().replace(/\s+/g, "")}.edu.az</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-blue-500" />
                    <span>www.{college.name.toLowerCase().replace(/\s+/g, "")}.edu.az</span>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Card>
                <CardContent className="p-6">
                  <Button className="w-full" size="lg">
                    Müraciət Et
                  </Button>
                  <p className="text-sm text-gray-600 text-center mt-3">Qəbul müddəti: 15 İyun - 15 Avqust</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
