import { NextRequest, NextResponse } from 'next/server'

interface ContactSubmission {
  name: string
  email: string
  company: string
  gap?: string
  message: string
  submittedAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, company' },
        { status: 400 }
      )
    }

    // Create submission object
    const submission: ContactSubmission = {
      name: body.name,
      email: body.email,
      company: body.company,
      gap: body.gap || '',
      message: body.message || '',
      submittedAt: new Date().toISOString(),
    }

    // TODO: In production, you would:
    // 1. Save to database (leads/contacts table)
    // 2. Send confirmation email to user
    // 3. Send notification email to sales team
    // 4. Trigger CRM sync (HubSpot, Salesforce, etc.)
    // 5. Add to email nurture sequence based on gap type

    console.log('Contact form submission:', submission)

    return NextResponse.json({
      success: true,
      message: 'Contact form received successfully',
      submission,
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
