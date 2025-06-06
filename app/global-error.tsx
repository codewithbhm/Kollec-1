"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error)
  }, [error])

  return (
    <html lang="az">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Ciddi Xəta</h1>

            <p className="text-gray-600 mb-8">Tətbiqetmədə ciddi bir xəta baş verdi. Səhifəni yeniləməyi cəhd edin.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Yenidən Cəhd Et
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Ana Səhifə
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
