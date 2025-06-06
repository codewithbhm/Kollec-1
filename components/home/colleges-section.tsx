"use client"

import { executeQuery } from "@/lib/db"
import type { College, Program } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, BookOpen, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

async function getColleges(): Promise<(College & { programs: Program[] })[]> {
  try {
    const colleges = await executeQuery<College & { programs: Program[] }>(`
      SELECT c.*, 
             json_agg(
               json_build_object(
                 'id', p.id,
                 'name', p.name,
                 'nameAz', p.name_az,
                 'description', p.description,
                 'duration', p.duration,
                 'degree', p.degree
               )
             ) FILTER (WHERE p.id IS NOT NULL) as programs
      FROM colleges c
      LEFT JOIN programs p ON c.id = p.college_id
      WHERE c.is_active = true
      GROUP BY c.id
      ORDER BY c.name
      LIMIT 6
    `)

    return colleges
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return []
  }
}

export async function CollegesSection() {
  const colleges = await getColleges()

  if (!colleges || colleges.length === 0) {
    return (
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Kolleclər</h2>
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
    <section className="py-16 bg-white dark:bg-gray-950 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20"></div>
      <div className="absolute -right-64 top-64 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">TƏHSİL MÜƏSSİSƏLƏRİ</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Kolleclər</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mt-4"></div>
          </div>
          <Link
            href="/colleges"
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
          {colleges.map((college) => (
            <motion.div key={college.id} variants={item}>
              <Card className="overflow-hidden h-full card-hover border-0 shadow-lg dark:shadow-gray-900/20">
                <div className="relative h-48 overflow-hidden group">
                  <Image
                    src={college.image || "/placeholder.svg?height=200&width=400"}
                    alt={college.nameAz || college.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center text-white">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900/60 backdrop-blur-sm">
                    <Link
                      href={`/colleges/${college.id}`}
                      className="bg-white text-blue-600 px-4 py-2 rounded-full flex items-center font-medium text-sm hover:bg-blue-50 transition-colors"
                    >
                      Ətraflı məlumat
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1">
                    <Link
                      href={`/colleges/${college.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {college.nameAz || college.name}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{college.programs?.length || 0} proqram</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {college.descriptionAz || college.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {college.programs?.slice(0, 2).map((program) => (
                        <Badge
                          key={program.id}
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                        >
                          {program.nameAz || program.name}
                        </Badge>
                      ))}
                      {college.programs?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{college.programs.length - 2}
                        </Badge>
                      )}
                    </div>
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
