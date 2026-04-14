import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'user/repo'
const [OWNER, REPO] = GITHUB_REPO.split('/')

interface Lead {
  id: string
  source: 'contact' | 'assessment'
  name: string
  email: string
  company: string
  submittedAt: string
  // contact-specific
  gap?: string
  message?: string
  // assessment-specific
  gapType?: string
  score?: number
  cycleLength?: number
  manualWork?: number
}

async function getLeads(): Promise<Lead[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3.raw' } }
    )
    if (response.ok) return await response.json()
  } catch {}
  return []
}

async function saveLeads(leads: Lead[], message: string): Promise<string> {
  const content = JSON.stringify(leads, null, 2)
  const getResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  let sha = undefined
  if (getResponse.ok) sha = (await getResponse.json()).sha

  const commitResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: Buffer.from(content).toString('base64'), sha, committer: { name: 'BHG Admin', email: 'admin@bhg.local' } }),
    }
  )
  if (!commitResponse.ok) throw new Error('Failed to commit leads to GitHub')
  return (await commitResponse.json()).commit.sha
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, lead } = await request.json()
    let leads = await getLeads()

    if (action === 'add') {
      leads.unshift({ ...lead, id: Date.now().toString() })
    } else if (action === 'delete') {
      leads = leads.filter(l => l.id !== lead.id)
    }

    const sha = await saveLeads(leads, `chore(leads): ${action} lead from ${lead.source}`)
    return NextResponse.json({ success: true, commit: sha })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const leads = await getLeads()
    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
