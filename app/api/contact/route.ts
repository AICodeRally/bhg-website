import { NextRequest, NextResponse } from 'next/server'
import { appendLead } from '@/lib/appendLead'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, gap, message } = body

    if (!name || !email || !company) {
      return NextResponse.json({ error: 'Name, email, and company are required' }, { status: 400 })
    }

    const lead = {
      id: Date.now().toString(),
      source: 'contact',
      name,
      email,
      company,
      gap: gap || '',
      message: message || '',
      submittedAt: new Date().toISOString(),
    }

    await appendLead(lead)

    return NextResponse.json({ success: true, message: 'Thank you! We will be in touch within 24 hours.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
