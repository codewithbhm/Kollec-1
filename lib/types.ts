export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "student" | "admin" | "counselor"
  createdAt: Date
  updatedAt: Date
}

export interface College {
  id: string
  name: string
  nameAz: string
  description: string
  descriptionAz: string
  location: string
  website?: string
  phone?: string
  email?: string
  image?: string
  programs: Program[]
  requirements: string
  tuitionFee?: number
  isActive: boolean
  createdAt: Date
}

export interface Program {
  id: string
  name: string
  nameAz: string
  description: string
  duration: number
  degree: "bachelor" | "master" | "diploma"
  collegeId: string
}

export interface Article {
  id: string
  title: string
  titleAz: string
  content: string
  contentAz: string
  excerpt: string
  image?: string
  category: string
  tags: string[]
  authorId: string
  published: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  userId: string
  collegeId: string
  programId: string
  status: "pending" | "approved" | "rejected" | "interview"
  documents: Document[]
  submittedAt: Date
  notes?: string
}

export interface Document {
  id: string
  name: string
  url: string
  type: string
  applicationId: string
}

export interface Category {
  id: string
  name: string
  nameAz: string
  slug: string
  postCount: number
}
