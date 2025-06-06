import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { College } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const colleges = await executeQuery<College>(`SELECT * FROM colleges WHERE id = ? AND is_active = true`, [id])

    if (colleges.length === 0) {
      return NextResponse.json({ error: "College not found" }, { status: 404 })
    }

    return NextResponse.json(colleges[0])
  } catch (error) {
    console.error("Error fetching college:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
