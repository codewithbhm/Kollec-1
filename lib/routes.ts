export interface RouteItem {
  path: string
  name: string
  nameAz: string
  description: string
  descriptionAz: string
  category: "main" | "content" | "auth" | "admin"
  icon?: string
  isPublic: boolean
}

// Update the routes to only include the ones that actually exist in the application
export const applicationRoutes: RouteItem[] = [
  // Main Routes
  {
    path: "/",
    name: "Home",
    nameAz: "Ana Səhifə",
    description: "Main homepage with latest news and information",
    descriptionAz: "Ən son xəbərlər və məlumatlarla əsas səhifə",
    category: "main",
    icon: "Home",
    isPublic: true,
  },
  {
    path: "/colleges",
    name: "Colleges",
    nameAz: "Kolleclər",
    description: "Browse all colleges and universities",
    descriptionAz: "Bütün kollec və universitetləri araşdırın",
    category: "main",
    icon: "GraduationCap",
    isPublic: true,
  },
  {
    path: "/news",
    name: "News",
    nameAz: "Xəbərlər",
    description: "Latest education news and articles",
    descriptionAz: "Ən son təhsil xəbərləri və məqalələr",
    category: "content",
    icon: "BookOpen",
    isPublic: true,
  },
  {
    path: "/contact",
    name: "Contact",
    nameAz: "Əlaqə",
    description: "Get in touch with us",
    descriptionAz: "Bizimlə əlaqə saxlayın",
    category: "main",
    icon: "Phone",
    isPublic: true,
  },
]

export function getRoutesByCategory(category: RouteItem["category"]): RouteItem[] {
  return applicationRoutes.filter((route) => route.category === category && route.isPublic)
}

export function getAllPublicRoutes(): RouteItem[] {
  return applicationRoutes.filter((route) => route.isPublic)
}

export function searchRoutes(query: string): RouteItem[] {
  const lowercaseQuery = query.toLowerCase()
  return applicationRoutes.filter(
    (route) =>
      route.isPublic &&
      (route.name.toLowerCase().includes(lowercaseQuery) ||
        route.nameAz.toLowerCase().includes(lowercaseQuery) ||
        route.description.toLowerCase().includes(lowercaseQuery) ||
        route.descriptionAz.toLowerCase().includes(lowercaseQuery)),
  )
}
