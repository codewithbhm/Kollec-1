import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"
import type { User } from "@/lib/types"

export async function GET() {
  return NextResponse.json({
    message: "Registration endpoint is available. Use POST method to register.",
    method: "POST",
    endpoint: "/api/auth/register",
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, password, phone } = body

    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if we have database connection
    if (!process.env.DATABASE_URL) {
      // Return mock registration for demo purposes
      const mockUser = {
        id: `demo-user-${Date.now()}`,
        email,
        name,
        phone: phone || null,
        role: "student" as const,
        createdAt: new Date(),
      }

      const token = generateToken(mockUser)

      return NextResponse.json({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          phone: mockUser.phone,
          role: mockUser.role,
        },
        token,
        message: "Demo registration successful",
      })
    }

    // Check if user already exists
    const existingUsers = await executeQuery<User>("SELECT id FROM users WHERE email = $1", [email])

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const newUsers = await executeQuery<User>(
      `INSERT INTO users (email, name, password_hash, phone) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, phone, role, created_at`,
      [email, name, hashedPassword, phone],
    )

    const user = newUsers[0]
    const token = generateToken(user)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)

    // Return a more specific error message
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Registration service temporarily unavailable",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
