import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"
import type { User } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, phone } = await request.json()

    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 })
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
