import { analyzeGaps, AssessmentResponse } from '@/lib/assessment'
import { subscribeToList, tagContact } from '@/lib/mailchimp'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AssessmentResponse

    // Analyze responses to determine gap type
    const analysis = analyzeGaps(body)

    // TODO: In a real implementation, you would:
    // 1. Save response to database
    // 2. Capture lead email from form
    // 3. Subscribe to Mailchimp with auto-tagging
    // For now, we return the analysis

    // Example Mailchimp integration (when email is available):
    // const email = body.email // This should come from the form
    // await subscribeToList(email)
    // await tagContact(email, [
    //   `Source - Assessment`,
    //   `Gap - ${analysis.gapType}`,
    //   `Score - ${analysis.score}`,
    // ])

    return NextResponse.json({
      success: true,
      gapType: analysis.gapType,
      score: analysis.score,
      dominantGap: analysis.dominantGap,
      allGaps: analysis.allGaps,
    })
  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}
