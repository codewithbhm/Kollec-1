import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

interface UserWithPassword {
  id: string
  email: string
  name: string
  phone?: string
  role: string
  password_hash: string
}

export async function GET() {
  return NextResponse.json({
    message: "Login endpoint is available. Use POST method to authenticate.",
    method: "POST",
    endpoint: "/api/auth/login",
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if we have database connection
    if (!process.env.DATABASE_URL) {
      // Return mock authentication for demo purposes
      if (email === "demo@kollec.az" && password === "demo123") {
        const mockUser = {
          id: "demo-user-id",
          email: "demo@kollec.az",
          name: "Demo User",
          phone: "+994 77 273 01 01",
          role: "student" as const,
        }

        const token = generateToken(mockUser)

        return NextResponse.json({
          user: mockUser,
          token,
          message: "Demo login successful",
        })
      } else {
        return NextResponse.json(
          {
            error: "Invalid credentials. For demo, use: demo@kollec.az / demo123",
          },
          { status: 401 },
        )
      }
    }

    // Find user in database
    const users = await executeQuery<UserWithPassword>(
      "SELECT id, email, name, phone, role, password_hash FROM users WHERE email = $1",
      [email],
    )

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role as "student" | "admin" | "counselor",
    })

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
    console.error("Login error:", error)

    // Return a more specific error message
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Authentication service temporarily unavailable",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
