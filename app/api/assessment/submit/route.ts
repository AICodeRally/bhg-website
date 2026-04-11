import { analyzeGaps, AssessmentResponse } from '@/lib/assessment'
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

    // Return analysis + all captured data
    // Your backend can hook into this endpoint to:
    // - Save lead data to your database
    // - Trigger email sequences
    // - Tag leads in your CRM
    // - Add to analytics pipeline
    const response = {
      success: true,
      submission: {
        email: body.email,
        company: body.company,
        name: body.name,
        responses: body,
        submittedAt: new Date().toISOString(),
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
