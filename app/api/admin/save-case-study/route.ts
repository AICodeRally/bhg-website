import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    // Verify token
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, study } = await request.json()

    // Read current case studies
    const filePath = join(process.cwd(), 'public', 'case-studies.json')
    let studies: CaseStudy[] = []

    try {
      const content = await readFile(filePath, 'utf-8')
      studies = JSON.parse(content)
    } catch {
      studies = []
    }

    if (action === 'add') {
      // Add new case study
      studies.push(study)
    } else if (action === 'update') {
      // Update existing case study
      const index = studies.findIndex(s => s.id === study.id)
      if (index !== -1) {
        studies[index] = study
      }
    } else if (action === 'delete') {
      // Delete case study
      studies = studies.filter(s => s.id !== study.id)
    }

    // Write back to file
    await writeFile(filePath, JSON.stringify(studies, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving case study:', error)
    return NextResponse.json({ error: 'Failed to save case study' }, { status: 500 })
  }
}
