// Mailchimp integration utilities
// Requires: MAILCHIMP_API_KEY, MAILCHIMP_API_URL, MAILCHIMP_LIST_ID environment variables

const API_KEY = process.env.MAILCHIMP_API_KEY
const API_URL = process.env.MAILCHIMP_API_URL
const LIST_ID = process.env.MAILCHIMP_LIST_ID

if (!API_KEY || !API_URL || !LIST_ID) {
  console.warn('Mailchimp environment variables not configured')
}

export async function subscribeToList(email: string, name?: string): Promise<boolean> {
  if (!API_KEY || !API_URL || !LIST_ID) {
    console.warn('Mailchimp not configured')
    return false
  }

  try {
    const response = await fetch(`${API_URL}/lists/${LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: name ? { FNAME: name } : undefined,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error)
    return false
  }
}

export async function tagContact(email: string, tags: string[]): Promise<boolean> {
  if (!API_KEY || !API_URL || !LIST_ID) {
    console.warn('Mailchimp not configured')
    return false
  }

  try {
    // Get subscriber hash (MD5 of lowercase email)
    const crypto = require('crypto')
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')

    const response = await fetch(
      `${API_URL}/lists/${LIST_ID}/members/${hash}/tags`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: tags.map((tag) => ({ name: tag, status: 'active' })),
        }),
      }
    )

    return response.ok
  } catch (error) {
    console.error('Error tagging contact in Mailchimp:', error)
    return false
  }
}
