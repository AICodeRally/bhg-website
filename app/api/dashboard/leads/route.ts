import { NextRequest, NextResponse } from 'next/server'

// This is a simple endpoint to retrieve stored leads
// In production, you'd fetch from a database
// For now, it returns the schema structure

export async function GET(request: NextRequest) {
  // TODO: In production, query your database here
  // This endpoint should return all assessment submissions

  return NextResponse.json({
    leads: [],
    schema: {
      fields: [
        { name: 'email', type: 'string', label: 'Email' },
        { name: 'company', type: 'string', label: 'Company' },
        { name: 'name', type: 'string', label: 'Name' },
        { name: 'gapType', type: 'string', label: 'Gap Type' },
        { name: 'score', type: 'number', label: 'Gap Score' },
        { name: 'cycleLength', type: 'number', label: 'Cycle Length (weeks)' },
        { name: 'manualWork', type: 'number', label: 'Manual Work %' },
        { name: 'submittedAt', type: 'string', label: 'Submitted At' },
      ],
    },
    example: {
      email: 'user@company.com',
      company: 'Acme Corp',
      name: 'John Doe',
      gapType: 'Compression',
      score: 75,
      cycleLength: 8,
      manualWork: 50,
      visibilityScore: 3,
      dataQuality: 2,
      painPoints: ['cycles', 'manual'],
      submittedAt: '2026-04-18T10:30:00Z',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: In production, save to database
    // Example implementation:
    // const lead = await db.leads.create({
    //   data: {
    //     email: body.email,
    //     company: body.company,
    //     name: body.name,
    //     gapType: body.analysis.gapType,
    //     score: body.analysis.score,
    //     responses: body.responses,
    //     submittedAt: new Date(),
    //   }
    // })

    return NextResponse.json({
      success: true,
      message: 'Lead saved successfully',
      // id: lead.id,
    })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
