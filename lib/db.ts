import { neon } from "@neondatabase/serverless"

// Make database connection optional for development
let sql: any = null

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL)
} else {
  console.warn("DATABASE_URL environment variable is not set. Using mock data for development.")
}

// Helper function to execute queries with error handling and fallback
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  if (!sql) {
    // Return mock data when database is not available
    return getMockData<T>(query)
  }

  try {
    const result = await sql(query, params)
    return result as T[]
  } catch (error) {
    console.error("Database query error:", error)
    console.warn("Falling back to mock data")
    return getMockData<T>(query)
  }
}

// Mock data for development
function getMockData<T>(query: string): T[] {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("articles")) {
    return [
      {
        id: "1",
        title: "College Admission Guide 2025",
        titleAz: "2025 Kollec Qəbul Bələdçisi",
        content: "Complete guide for college admissions in Azerbaijan...",
        contentAz: "Azərbaycanda kollec qəbulu üçün tam bələdçi...",
        excerpt: "Everything you need to know about college admissions",
        image: "/placeholder.svg?height=400&width=600",
        category_name: "Admissions",
        author_name: "Admin User",
        views: 150,
        createdAt: new Date("2025-01-06"),
        published: true,
      },
      {
        id: "2",
        title: "New Academic Programs Available",
        titleAz: "Yeni Akademik Proqramlar Mövcuddur",
        content: "Exciting new academic programs for 2025...",
        contentAz: "2025-ci il üçün maraqlı yeni akademik proqramlar...",
        excerpt: "Discover our latest academic offerings",
        image: "/placeholder.svg?height=400&width=600",
        category_name: "Programs",
        author_name: "Admin User",
        views: 89,
        createdAt: new Date("2025-01-05"),
        published: true,
      },
      {
        id: "3",
        title: "Student Success Stories",
        titleAz: "Tələbə Uğur Hekayələri",
        content: "Inspiring stories from our successful graduates...",
        contentAz: "Uğurlu məzunlarımızdan ilhamverici hekayələr...",
        excerpt: "Read about our students' achievements",
        image: "/placeholder.svg?height=400&width=600",
        category_name: "Student Life",
        author_name: "Admin User",
        views: 234,
        createdAt: new Date("2025-01-04"),
        published: true,
      },
    ] as T[]
  }

  if (queryLower.includes("colleges")) {
    return [
      {
        id: "1",
        name: "Azerbaijan State University",
        nameAz: "Azərbaycan Dövlət Universiteti",
        description: "Leading university in Azerbaijan",
        descriptionAz: "Azərbaycanda aparıcı universitet",
        location: "Baku",
        phone: "+994-12-123-45-67",
        email: "info@asu.edu.az",
        website: "https://asu.edu.az",
        image: "/placeholder.svg?height=400&width=600",
        isActive: true,
        programs: [
          {
            id: "1",
            name: "Computer Science",
            nameAz: "Kompüter Elmləri",
            description: "Modern computer science program",
            duration: 4,
            degree: "bachelor",
          },
          {
            id: "2",
            name: "Business Administration",
            nameAz: "Biznes İdarəetməsi",
            description: "Comprehensive business program",
            duration: 4,
            degree: "bachelor",
          },
        ],
      },
      {
        id: "2",
        name: "Baku State University",
        nameAz: "Bakı Dövlət Universiteti",
        description: "Premier educational institution",
        descriptionAz: "Aparıcı təhsil müəssisəsi",
        location: "Baku",
        phone: "+994-12-765-43-21",
        email: "contact@bsu.edu.az",
        website: "https://bsu.edu.az",
        image: "/placeholder.svg?height=400&width=600",
        isActive: true,
        programs: [
          {
            id: "3",
            name: "Engineering",
            nameAz: "Mühəndislik",
            description: "Technical engineering program",
            duration: 4,
            degree: "bachelor",
          },
        ],
      },
      {
        id: "3",
        name: "Azerbaijan Technical University",
        nameAz: "Azərbaycan Texniki Universiteti",
        description: "Technical education excellence",
        descriptionAz: "Texniki təhsildə mükəmməllik",
        location: "Baku",
        phone: "+994-12-987-65-43",
        email: "info@atu.edu.az",
        website: "https://atu.edu.az",
        image: "/placeholder.svg?height=400&width=600",
        isActive: true,
        programs: [
          {
            id: "4",
            name: "Information Technology",
            nameAz: "İnformasiya Texnologiyaları",
            description: "Modern IT program",
            duration: 4,
            degree: "bachelor",
          },
          {
            id: "5",
            name: "Mechanical Engineering",
            nameAz: "Mexaniki Mühəndislik",
            description: "Mechanical engineering program",
            duration: 4,
            degree: "bachelor",
          },
        ],
      },
    ] as T[]
  }

  if (queryLower.includes("categories")) {
    return [
      {
        id: "1",
        name: "News",
        nameAz: "Xəbərlər",
        slug: "news",
        postCount: 15,
      },
      {
        id: "2",
        name: "Admissions",
        nameAz: "Qəbul",
        slug: "admissions",
        postCount: 8,
      },
      {
        id: "3",
        name: "Programs",
        nameAz: "Proqramlar",
        slug: "programs",
        postCount: 12,
      },
      {
        id: "4",
        name: "Student Life",
        nameAz: "Tələbə Həyatı",
        slug: "student-life",
        postCount: 6,
      },
    ] as T[]
  }

  // Default empty array for unknown queries
  return [] as T[]
}
