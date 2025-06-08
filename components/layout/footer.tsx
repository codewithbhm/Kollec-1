import Link from "next/link"
import { Phone, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-5 bg-cover bg-center"></div>
      <div className="absolute -left-64 -bottom-64 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute -right-64 -top-64 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      {/* Mobile-Optimized Newsletter section */}
      <div className="relative border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Yeniliklərdən xəbərdar olun</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Ən son xəbərlər və təhsil imkanları haqqında məlumat əldə edin
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                type="email"
                placeholder="E-poçt ünvanınız"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 text-sm sm:text-base h-10 sm:h-12"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap">
                Abunə ol <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-sm sm:text-base">
                K
              </span>
              KOLLEC.AZ
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Azərbaycanda kollec və universitet qəbulu üzrə aparıcı məsləhət platforması
            </p>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              <Link
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 relative">
              <span className="relative z-10">Sürətli Keçidlər</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/colleges"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Kolleclər
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Qəbul Prosesi
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Xəbərlər
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 relative">
              <span className="relative z-10">Xidmətlər</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/consulting"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Təhsil Məsləhəti
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-prep"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  İmtahan Hazırlığı
                </Link>
              </li>
              <li>
                <Link
                  href="/document-help"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sənəd Hazırlığı
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guidance"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm sm:text-base py-1"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Karyera Məsləhəti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 relative">
              <span className="relative z-10">Əlaqə</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">+994 77 273 01 01</p>
                  <p className="text-gray-400 text-sm sm:text-base">+994 77 273 01 00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm sm:text-base break-all">info@kollec.az</p>
                  <p className="text-gray-400 text-sm sm:text-base break-all">support@kollec.az</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">Bakı şəhəri</p>
                  <p className="text-gray-400 text-sm sm:text-base">Azərbaycan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Bottom section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 KOLLEC.AZ. Bütün hüquqlar qorunur.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Məxfilik Siyasəti
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                İstifadə Şərtləri
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Siyasəti
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
