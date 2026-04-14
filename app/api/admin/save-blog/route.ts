import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'user/repo'
const [OWNER, REPO] = GITHUB_REPO.split('/')

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

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/blog-posts.json`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    )
    if (response.ok) {
      return await response.json()
    }
  } catch {}
  return []
}

async function saveBlogPosts(posts: BlogPost[], message: string): Promise<string> {
  const content = JSON.stringify(posts, null, 2)

  const getResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/blog-posts.json`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  let sha = undefined
  if (getResponse.ok) {
    const data = await getResponse.json()
    sha = data.sha
  }

  const commitResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/blog-posts.json`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
        committer: {
          name: 'BHG Admin',
          email: 'admin@bhg.local',
        },
      }),
    }
  )

  if (!commitResponse.ok) {
    throw new Error('Failed to commit to GitHub')
  }

  const result = await commitResponse.json()
  return result.commit.sha
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    // Verify token
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, post } = await request.json()
    let posts = await getBlogPosts()

    if (action === 'add') {
      posts.push(post)
    } else if (action === 'update') {
      const index = posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        posts[index] = post
      }
    } else if (action === 'delete') {
      posts = posts.filter(p => p.id !== post.id)
    }

    const message = `chore(blog): ${action} blog post "${post.title || 'post'}" via admin dashboard`
    const sha = await saveBlogPosts(posts, message)

    return NextResponse.json({ success: true, commit: sha })
  } catch (error) {
    console.error('Error saving blog post:', error)
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 })
  }
}
