import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'user/repo'
const [OWNER, REPO] = GITHUB_REPO.split('/')

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await request.json()
    const filePath = 'public/content.json'
    const contentStr = JSON.stringify(content, null, 2)

    // Get current file SHA for update
    const getResponse = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
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

    // Commit the file
    const commitResponse = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'chore(content): update homepage content via admin dashboard',
          content: Buffer.from(contentStr).toString('base64'),
          sha,
          committer: {
            name: 'BHG Admin',
            email: 'admin@bhg.local',
          },
        }),
      }
    )

    if (!commitResponse.ok) {
      const errorData = await commitResponse.text()
      console.error('GitHub API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to save content to GitHub' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Content saved successfully',
      commit: (await commitResponse.json()).commit.sha,
    })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { message: 'Error saving content', error: String(error) },
      { status: 500 }
    )
  }
}
