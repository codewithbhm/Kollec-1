import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { User } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "kollec-demo-secret-key-2025"

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 12)
  } catch (error) {
    console.error("Error hashing password:", error)
    throw new Error("Password hashing failed")
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

export function generateToken(user: Omit<User, "createdAt" | "updatedAt">): string {
  try {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )
  } catch (error) {
    console.error("Error generating token:", error)
    throw new Error("Token generation failed")
  }
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error("Error verifying token:", error)
    throw new Error("Invalid token")
  }
}

// Helper function to extract token from Authorization header
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}

// Helper function to get user from token
export function getUserFromToken(token: string): any {
  try {
    const decoded = verifyToken(token)
    return decoded
  } catch (error) {
    return null
  }
}
