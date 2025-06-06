"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, MapPin, Globe, Phone, Mail, Clock, Users, GraduationCap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import type { College } from "@/lib/types"

interface CollegePageProps {
  params: { id: string } // Fixed: params is a regular object, not a Promise
}

export default function CollegePage({ params }: CollegePageProps) {
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = params // Directly access the id from params

  useEffect(() => {
    // Fetch college data when component mounts
    fetchCollege(id)
  }, [id])

  const fetchCollege = async (collegeId: string) => {
    try {
      const response = await fetch(`/api/colleges/${collegeId}`)
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

      {/* College Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-blue-200">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {college.type}
                    </Badge>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{college.name}</h1>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span className="font-medium">İxtisas sayı: {college.programs.length}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="font-medium">Tələbə sayı: {college.student_count}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    <p className="text-lg">{college.description}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Əlaqə Məlumatları</h2>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Phone className="w-5 h-5 mr-3 text-blue-600" />
                          <span>{college.contact.phone}</span>
                        </li>
                        <li className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-blue-600" />
                          <span>{college.contact.email}</span>
                        </li>
                        <li className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                          <span>{college.contact.address}</span>
                        </li>
                        <li className="flex items-center">
                          <Globe className="w-5 h-5 mr-3 text-blue-600" />
                          <a
                            href={college.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {college.contact.website.replace(/^https?:\/\//, "")}
                          </a>
                        </li>
                        <li className="flex items-center">
                          <Clock className="w-5 h-5 mr-3 text-blue-600" />
                          <span>İş saatları: {college.contact.hours}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">İxtisaslar</h2>
                      <ul className="space-y-2">
                        {college.programs.map((program, index) => (
                          <li key={index} className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {program.code}
                            </Badge>
                            <span>{program.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Qəbul Məlumatları</h2>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="mb-4">{college.admission_info}</p>
                      <Button>Qəbul üçün müraciət et</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        </div>
      </div>
    </div>
  )
}
