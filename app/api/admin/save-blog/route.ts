import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  featured: boolean
  readTime: number
  content: string
  tags: string[]
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    // Verify token
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, post } = await request.json()

    // Read current blog posts
    const filePath = join(process.cwd(), 'public', 'blog-posts.json')
    let posts: BlogPost[] = []

    try {
      const content = await readFile(filePath, 'utf-8')
      posts = JSON.parse(content)
    } catch {
      posts = []
    }

    if (action === 'add') {
      // Add new blog post
      posts.push(post)
    } else if (action === 'update') {
      // Update existing blog post
      const index = posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        posts[index] = post
      }
    } else if (action === 'delete') {
      // Delete blog post
      posts = posts.filter(p => p.id !== post.id)
    }

    // Write back to file
    await writeFile(filePath, JSON.stringify(posts, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving blog post:', error)
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 })
  }
}
