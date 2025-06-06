"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Route,
  Search,
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  Plus,
  Map,
  Award,
  Phone,
  Building,
  LogIn,
  UserPlus,
  Shield,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { applicationRoutes, getRoutesByCategory, searchRoutes, type RouteItem } from "@/lib/routes"
import { useApp } from "@/app/providers"

const iconMap = {
  Home,
  GraduationCap,
  BookOpen,
  FileText,
  Plus,
  Map,
  Award,
  Phone,
  Building,
  LogIn,
  UserPlus,
  Shield,
}

interface RoutesModalProps {
  children: React.ReactNode
}

export function RoutesModal({ children }: RoutesModalProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRoutes, setFilteredRoutes] = useState<RouteItem[]>(applicationRoutes)
  const [activeCategory, setActiveCategory] = useState("all")
  const { state } = useApp()

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredRoutes(searchRoutes(searchQuery))
    } else if (activeCategory === "all") {
      setFilteredRoutes(applicationRoutes.filter((route) => route.isPublic))
    } else {
      setFilteredRoutes(getRoutesByCategory(activeCategory as RouteItem["category"]))
    }
  }, [searchQuery, activeCategory])

  const categories = [
    { value: "all", label: "Hamısı", labelEn: "All" },
    { value: "main", label: "Əsas", labelEn: "Main" },
    { value: "content", label: "Məzmun", labelEn: "Content" },
    { value: "auth", label: "Giriş", labelEn: "Auth" },
  ]

  // Update the handleRouteClick function to use Next.js router
  const handleRouteClick = (path: string) => {
    setOpen(false)
    // Use window.location for more reliable navigation
    window.location.href = path
  }

  const RouteIcon = ({ iconName }: { iconName?: string }) => {
    if (!iconName || !iconMap[iconName as keyof typeof iconMap]) {
      return <Route className="w-4 h-4" />
    }
    const Icon = iconMap[iconName as keyof typeof iconMap]
    return <Icon className="w-4 h-4" />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Route className="w-5 h-5 mr-2 text-blue-600" />
            {state.language === "az" ? "Bütün Marşrutlar" : "All Routes"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={state.language === "az" ? "Marşrut axtar..." : "Search routes..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value} className="text-xs">
                  {state.language === "az" ? category.label : category.labelEn}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                <AnimatePresence mode="wait">
                  {filteredRoutes.length > 0 ? (
                    <motion.div
                      key={`${activeCategory}-${searchQuery}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      {filteredRoutes.map((route, index) => (
                        <motion.div
                          key={route.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4 border-l-blue-500/20 hover:border-l-blue-500">
                            <CardContent
                              className="p-4"
                              onClick={() => handleRouteClick(route.path)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleRouteClick(route.path)
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                                    <RouteIcon iconName={route.icon} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {state.language === "az" ? route.nameAz : route.name}
                                      </h4>
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                      >
                                        {route.category}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                      {state.language === "az" ? route.descriptionAz : route.description}
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono mt-1">
                                      {route.path}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {route.path.includes("[id]") && (
                                    <Badge variant="secondary" className="text-xs">
                                      Dynamic
                                    </Badge>
                                  )}
                                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {state.language === "az" ? "Marşrut tapılmadı" : "No routes found"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {state.language === "az"
                          ? "Axtarış kriteriyalarınızı dəyişdirməyi cəhd edin"
                          : "Try adjusting your search criteria"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                {filteredRoutes.length} {state.language === "az" ? "marşrut tapıldı" : "routes found"}
              </span>
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-3 h-3" />
                <span>{state.language === "az" ? "Klikləyərək keçid edin" : "Click to navigate"}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
