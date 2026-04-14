const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO || 'user/repo'
const [OWNER, REPO] = GITHUB_REPO.split('/')

export async function appendLead(lead: object): Promise<void> {
  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3.raw' } }
    )
    let leads: object[] = []
    let sha: string | undefined
    if (getRes.ok) {
      leads = await getRes.json()
      const shaRes = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
        { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
      )
      if (shaRes.ok) sha = (await shaRes.json()).sha
    }
    leads.unshift(lead)
    await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/leads.json`,
      {
        method: 'PUT',
        headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'chore(leads): new lead captured',
          content: Buffer.from(JSON.stringify(leads, null, 2)).toString('base64'),
          sha,
          committer: { name: 'BHG Website', email: 'website@bhg.local' },
        }),
      }
    )
  } catch (e) {
    console.error('Lead save error:', e)
    // Don't throw — lead capture failure should not break form submission
  }
}
