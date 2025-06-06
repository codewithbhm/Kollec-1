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
    path: "/admission",
    name: "College Admission",
    nameAz: "Kollecə Qəbul",
    description: "Information about college admission process",
    descriptionAz: "Kollec qəbul prosesi haqqında məlumat",
    category: "main",
    icon: "FileText",
    isPublic: true,
  },
  {
    path: "/additional-admission",
    name: "Additional Admission",
    nameAz: "Əlavə Qəbul",
    description: "Additional admission opportunities",
    descriptionAz: "Əlavə qəbul imkanları",
    category: "main",
    icon: "Plus",
    isPublic: true,
  },
  {
    path: "/education-map",
    name: "Education Map",
    nameAz: "Təhsil Xəritəsi",
    description: "Interactive education map and guidance",
    descriptionAz: "İnteraktiv təhsil xəritəsi və bələdçi",
    category: "main",
    icon: "Map",
    isPublic: true,
  },
  {
    path: "/exam-results",
    name: "Exam Results",
    nameAz: "İmtahan Nəticələri",
    description: "Check exam results and scores",
    descriptionAz: "İmtahan nəticələri və balları yoxlayın",
    category: "content",
    icon: "Award",
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
  // Dynamic Routes (examples)
  {
    path: "/colleges/[id]",
    name: "College Details",
    nameAz: "Kollec Təfərrüatları",
    description: "Detailed information about specific college",
    descriptionAz: "Müəyyən kollec haqqında ətraflı məlumat",
    category: "content",
    icon: "Building",
    isPublic: true,
  },
  {
    path: "/news/[id]",
    name: "Article Details",
    nameAz: "Məqalə Təfərrüatları",
    description: "Read full article content",
    descriptionAz: "Məqalənin tam məzmununu oxuyun",
    category: "content",
    icon: "FileText",
    isPublic: true,
  },
  // Auth Routes (if implemented)
  {
    path: "/login",
    name: "Login",
    nameAz: "Giriş",
    description: "User login page",
    descriptionAz: "İstifadəçi giriş səhifəsi",
    category: "auth",
    icon: "LogIn",
    isPublic: true,
  },
  {
    path: "/register",
    name: "Register",
    nameAz: "Qeydiyyat",
    description: "User registration page",
    descriptionAz: "İstifadəçi qeydiyyat səhifəsi",
    category: "auth",
    icon: "UserPlus",
    isPublic: true,
  },
  // Additional useful routes
  {
    path: "/privacy",
    name: "Privacy Policy",
    nameAz: "Məxfilik Siyasəti",
    description: "Privacy policy and data protection",
    descriptionAz: "Məxfilik siyasəti və məlumat qorunması",
    category: "content",
    icon: "Shield",
    isPublic: true,
  },
  {
    path: "/terms",
    name: "Terms of Service",
    nameAz: "İstifadə Şərtləri",
    description: "Terms and conditions of use",
    descriptionAz: "İstifadə qaydaları və şərtləri",
    category: "content",
    icon: "FileText",
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
