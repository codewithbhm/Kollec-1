"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw, Bug } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8 animate-bounce-in-top">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Error Card */}
        <Card className="glass-effect border-0 shadow-2xl animate-fade-in-up">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              {/* Error Message */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Xəta Baş Verdi</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Təəssüf ki, gözlənilməz bir xəta baş verdi. Texniki komandamız bu məsələ ilə məşğuldur.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Texniki Məlumat
                    </summary>
                    <pre className="text-sm text-red-600 dark:text-red-400 overflow-auto">{error.message}</pre>
                  </details>
                )}
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button onClick={reset} size="lg" className="group">
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Yenidən Cəhd Et
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Ana Səhifə
                  </Link>
                </Button>
              </div>

              {/* Report Error */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Problem davam edirsə?{" "}
                  <Link
                    href="/contact"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                  >
                    <Bug className="w-4 h-4 mr-1" />
                    Xətanı bildir
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
