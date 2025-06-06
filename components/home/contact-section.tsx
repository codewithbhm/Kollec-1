"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ContactSection() {
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      details: ["+994 77 273 01 01", "+994 77 273 01 00"],
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "E-poçt",
      details: ["info@kollec.az", "support@kollec.az"],
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: "Ünvan",
      details: ["Bakı şəhəri", "Azərbaycan"],
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "İş Saatları",
      details: ["B.e - Cümə", "09:00 - 18:00"],
      color: "bg-orange-500",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-grid-white/5"></div>

      {/* Animated shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-blue-300"
          >
            BİZİMLƏ ƏLAQƏ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold text-white mt-2"
          >
            Bizimlə Əlaqə Saxlayın
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-100 mt-4 max-w-2xl mx-auto"
          >
            Təhsil məsləhəti və kollec qəbulu ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-blue-400 mt-4 mx-auto"
          ></motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactInfo.map((item, index) => (
            <motion.div key={index} variants={item}>
              <Card className="glass-effect border-0 overflow-hidden group">
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300",
                      item.color,
                    )}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-blue-100">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg group">
              Ətraflı Əlaqə Məlumatları
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
