import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { College, Program } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const offset = (page - 1) * limit

    let query = `
      SELECT c.*, 
             json_agg(
               json_build_object(
                 'id', p.id,
                 'name', p.name,
                 'nameAz', p.name_az,
                 'description', p.description,
                 'duration', p.duration,
                 'degree', p.degree
               )
             ) FILTER (WHERE p.id IS NOT NULL) as programs
      FROM colleges c
      LEFT JOIN programs p ON c.id = p.college_id
      WHERE c.is_active = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (search) {
      query += ` AND (c.name ILIKE $${paramIndex} OR c.name_az ILIKE $${paramIndex} OR c.location ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` GROUP BY c.id ORDER BY c.name LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const colleges = await executeQuery<College & { programs: Program[] }>(query, params)

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM colleges WHERE is_active = true"
    const countParams: any[] = []

    if (search) {
      countQuery += " AND (name ILIKE $1 OR name_az ILIKE $1 OR location ILIKE $1)"
      countParams.push(`%${search}%`)
    }

    const countResult = await executeQuery<{ total: number }>(countQuery, countParams)
    const total = Number.parseInt(countResult[0].total.toString())

    return NextResponse.json({
      colleges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Colleges API error:", error)
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}
