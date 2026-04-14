import { analyzeGaps, AssessmentResponse } from '@/lib/assessment'
import { appendLead } from '@/lib/appendLead'
import { NextRequest, NextResponse } from 'next/server'

export interface AssessmentSubmission extends AssessmentResponse {
  email?: string
  company?: string
  name?: string
  submittedAt?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AssessmentSubmission

    // Analyze responses to determine gap type
    const analysis = analyzeGaps(body)

    // Capture the lead
    const submittedAt = new Date().toISOString()
    await appendLead({
      id: Date.now().toString(),
      source: 'assessment',
      name: body.name || 'Anonymous',
      email: body.email || '',
      company: body.company || '',
      gapType: analysis.dominantGap,
      score: analysis.score,
      cycleLength: body.cycleLength,
      manualWork: body.manualWork,
      submittedAt,
    })

    // Return analysis + all captured data
    const response = {
      success: true,
      submission: {
        email: body.email,
        company: body.company,
        name: body.name,
        responses: body,
        submittedAt,
      },
      analysis: {
        gapType: analysis.gapType,
        score: analysis.score,
        dominantGap: analysis.dominantGap,
        allGaps: analysis.allGaps,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}
