import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'user/repo'
const [OWNER, REPO] = GITHUB_REPO.split('/')

interface CaseStudy {
  id: string
  title: string
  slug: string
  platform: string
  industry: string
  companySize: string
  heroImage: string
  excerpt: string
  challenge: {
    title: string
    description: string
    bullets: string[]
  }
  solution: {
    title: string
    description: string
    approach: string[]
  }
  results: Array<{
    metric: string
    before: string
    after: string
    impact: string
  }>
  roi: {
    annualSavings: string
    savingsBreakdown: string
    paybackPeriod: string
  }
  testimonial: {
    quote: string
    author: string
    company: string
  }
  nextSteps: string[]
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/case-studies.json`,
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

async function saveCaseStudies(studies: CaseStudy[], message: string): Promise<string> {
  const content = JSON.stringify(studies, null, 2)

  const getResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/case-studies.json`,
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
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/case-studies.json`,
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

    const { action, study } = await request.json()
    let studies = await getCaseStudies()

    if (action === 'add') {
      studies.push(study)
    } else if (action === 'update') {
      const index = studies.findIndex(s => s.id === study.id)
      if (index !== -1) {
        studies[index] = study
      }
    } else if (action === 'delete') {
      studies = studies.filter(s => s.id !== study.id)
    }

    const message = `chore(case-studies): ${action} case study "${study.title || 'study'}" via admin dashboard`
    const sha = await saveCaseStudies(studies, message)

    return NextResponse.json({ success: true, commit: sha })
  } catch (error) {
    console.error('Error saving case study:', error)
    return NextResponse.json({ error: 'Failed to save case study' }, { status: 500 })
  }
}
