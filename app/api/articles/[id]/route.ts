import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Article } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const articles = await executeQuery<Article>(`SELECT * FROM articles WHERE id = ? AND published = true`, [id])

    if (articles.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(articles[0])
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
