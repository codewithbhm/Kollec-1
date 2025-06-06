import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Article } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search") || ""
    const offset = (page - 1) * limit

    let query = `
      SELECT a.*, 
             c.name as category_name,
             c.name_az as category_name_az,
             c.slug as category_slug,
             u.name as author_name
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.published = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (category) {
      query += ` AND c.slug = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (search) {
      query += ` AND (a.title ILIKE $${paramIndex} OR a.title_az ILIKE $${paramIndex} OR a.content ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY a.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const articles = await executeQuery<
      Article & {
        category_name: string
        category_name_az: string
        category_slug: string
        author_name: string
      }
    >(query, params)

    // Get total count
    let countQuery =
      "SELECT COUNT(*) as total FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.published = true"
    const countParams: any[] = []
    let countParamIndex = 1

    if (category) {
      countQuery += ` AND c.slug = $${countParamIndex}`
      countParams.push(category)
      countParamIndex++
    }

    if (search) {
      countQuery += ` AND (a.title ILIKE $${countParamIndex} OR a.title_az ILIKE $${countParamIndex} OR a.content ILIKE $${countParamIndex})`
      countParams.push(`%${search}%`)
    }

    const countResult = await executeQuery<{ total: number }>(countQuery, countParams)
    const total = Number.parseInt(countResult[0].total.toString())

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Articles API error:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
