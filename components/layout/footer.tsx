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

      {/* Newsletter section */}
      <div className="relative border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Yeniliklərdən xəbərdar olun</h3>
              <p className="text-gray-400">Ən son xəbərlər və təhsil imkanları haqqında məlumat əldə edin</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="E-poçt ünvanınız"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Abunə ol <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">K</span>
              KOLLEC.AZ
            </h3>
            <p className="text-gray-400 mb-6">
              Azərbaycanda kollec və universitet qəbulu üzrə aparıcı məsləhət platforması
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Sürətli Keçidlər</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/colleges"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Kolleclər
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Qəbul Prosesi
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Xəbərlər
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Xidmətlər</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/consulting"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Təhsil Məsləhəti
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-prep"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  İmtahan Hazırlığı
                </Link>
              </li>
              <li>
                <Link
                  href="/document-help"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sənəd Hazırlığı
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guidance"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Karyera Məsləhəti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Əlaqə</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+994 77 273 01 01</p>
                  <p className="text-gray-400">+994 77 273 01 00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">info@kollec.az</p>
                  <p className="text-gray-400">support@kollec.az</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Bakı şəhəri</p>
                  <p className="text-gray-400">Azərbaycan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 KOLLEC.AZ. Bütün hüquqlar qorunur.</div>
            <div className="flex space-x-6 text-sm">
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
