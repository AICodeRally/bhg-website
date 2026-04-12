# BHG Email Automation Guide — Phase 4C

This guide explains how to automatically enroll leads in email nurture sequences based on their assessment gap type and contact form submissions. 

No third-party vendor lock-in: clean API integration points that work with any email service (Mailchimp, SendGrid, Klaviyo, custom backend, etc.).

## Overview

**Goal:** Turn assessment results and contact forms into automated, personalized nurture campaigns.

**Mechanics:**
1. Lead completes assessment → identified gap type (Compression, ManualWork, Visibility, DataQuality)
2. Lead is scored (Phase 4B)
3. Lead is automatically enrolled in gap-specific email sequence
4. Sequence sends on pre-defined delays (day 0, day 3, day 7, day 14)
5. Each email uses {{variables}} to personalize from assessment data

## Email Sequences

You already have the structure in `public/email-templates.json`. Each sequence has 4 emails:

```json
{
  "id": "compression_gap",
  "name": "Compression Gap Nurture",
  "description": "For leads with compression cycle opportunity",
  "emails": [
    {
      "id": "compression_1",
      "order": 1,
      "delay": 0,
      "subject": "You have a compression cycle optimization opportunity",
      "preheader": "Here's what we found",
      "template": "compression_results"
    },
    // ... 3 more emails at delays 3, 7, 14 days
  ]
}
```

**Four sequences total:**
1. **Awareness** — For general interest (assessment only, no gap identified)
2. **Compression Gap** — For leads with cycle length > 6 weeks
3. **Manual Work Gap** — For leads with manual work > 50%
4. **Visibility Gap** — For leads with visibility score < 3

## Email Variables (Personalization)

Each email template uses placeholders to personalize from lead data:

```html
<!-- Example email template with variables -->
<p>Hi {{first_name}},</p>

<p>In your recent assessment, we found that your compression cycle 
takes <strong>{{cycle_length}} weeks</strong> — about 
<strong>{{gap_score}}</strong> points on our severity scale.</p>

<p>For {{company}}, that's likely costing you <strong>${{annual_cost}}</strong> 
per year in delayed close and lost forecast accuracy.</p>

<p>Here's how companies like yours have compressed to 3-4 weeks...</p>
```

**Available Variables:**

| Variable | Source | Example | Note |
|----------|--------|---------|------|
| `{{first_name}}` | Contact form | John | Falls back to "there" if missing |
| `{{company}}` | Contact form / Assessment | Acme Corp | Required |
| `{{gap_type}}` | Assessment analysis | Compression | One of: Compression, ManualWork, Visibility, DataQuality |
| `{{gap_score}}` | Assessment analysis | 78 | 0-100 scale |
| `{{cycle_length}}` | Assessment response | 10 | Weeks |
| `{{manual_work_percent}}` | Assessment response | 65 | Percentage 0-100 |
| `{{visibility_score}}` | Assessment response | 2 | 1-5 scale |
| `{{data_quality_score}}` | Assessment response | 2 | 1-5 scale |
| `{{annual_cost}}` | Calculated from assessment | 500000 | USD, estimated impact |
| `{{email}}` | Contact form | john@acme.com | Recipient email |

## Routing Logic

**When assessment is submitted:**

```javascript
function enrollInNurtureSequence(assessment, contactForm) {
  // Step 1: Determine dominant gap
  const gaps = analyzeGaps(assessment)
  const dominantGap = gaps.find(g => g.dominant === true)
  
  // Step 2: Select sequence
  let sequenceId
  if (dominantGap.type === 'Compression') {
    sequenceId = 'compression_gap'
  } else if (dominantGap.type === 'ManualWork') {
    sequenceId = 'manual_work_gap'
  } else if (dominantGap.type === 'Visibility') {
    sequenceId = 'visibility_gap'
  } else if (dominantGap.type === 'DataQuality') {
    sequenceId = 'data_quality_gap'
  } else {
    sequenceId = 'awareness'  // No strong gap, general nurture
  }
  
  // Step 3: Prepare variables from assessment + contact data
  const variables = {
    first_name: contactForm.name?.split(' ')[0] || 'there',
    company: contactForm.company,
    email: contactForm.email,
    gap_type: dominantGap.type,
    gap_score: dominantGap.score,
    cycle_length: assessment.cycleLength,
    manual_work_percent: assessment.manualWorkPercentage,
    visibility_score: assessment.visibilityScore,
    data_quality_score: assessment.dataQuality,
    annual_cost: estimateCost(assessment),
  }
  
  // Step 4: Enroll in sequence
  await enrollLead(contactForm.email, sequenceId, variables)
  
  return { sequenceId, variables }
}
```

**When contact form is submitted (no assessment):**

```javascript
function enrollContactFormLead(formData) {
  // No assessment data, so use general awareness sequence
  const variables = {
    first_name: formData.name?.split(' ')[0] || 'there',
    company: formData.company,
    email: formData.email,
    gap_type: formData.gap || 'General',  // If they selected a gap
    // ... other variables empty
  }
  
  // Enroll in awareness sequence (or gap-specific if they selected one)
  const sequenceId = formData.gap ? `${formData.gap}_gap` : 'awareness'
  await enrollLead(formData.email, sequenceId, variables)
  
  return { sequenceId, variables }
}
```

## Implementation Options

### Option A: Email Service API (Recommended for simplicity)

Use your email provider's native API to:
1. Create a contact
2. Add to audience/segment
3. Start automation

**Mailchimp Example:**

```javascript
async function enrollInMailchimp(lead, sequenceId, variables) {
  // 1. Create/update contact
  await mailchimp.lists.members.createOrUpdate(
    audienceId,
    {
      email_address: lead.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: variables.first_name,
        COMPANY: variables.company,
        GAPTYPE: variables.gap_type,
        GAPSCORE: variables.gap_score,
      }
    }
  )
  
  // 2. Add tag to trigger automation
  // (Mailchimp automations trigger off tags)
  await mailchimp.lists.members.tags.post(
    audienceId,
    lead.email,
    { tags: [{ name: `seq-${sequenceId}`, status: 'active' }] }
  )
  
  // Result: Mailchimp automation starts sending sequence
}
```

**SendGrid Example:**

```javascript
async function enrollInSendGrid(lead, sequenceId, variables) {
  // 1. Add contact with custom fields
  await sgMail.contactsDb.recipients.put({
    email: lead.email,
    first_name: variables.first_name,
    company: variables.company,
    custom_fields: {
      gap_type: variables.gap_type,
      gap_score: variables.gap_score,
    }
  })
  
  // 2. Add to automation list
  // (SendGrid automations trigger off list membership)
  await sgMail.contactsDb.lists.addContacts(
    `${sequenceId}-automation`,
    { emails: [lead.email] }
  )
  
  // Result: SendGrid automation starts sending sequence
}
```

### Option B: Custom Backend (Full Control)

If you want complete control, your backend manages email sending:

```javascript
async function enrollLead(email, sequenceId, variables) {
  // 1. Save enrollment record
  const enrollment = await db.emailEnrollments.create({
    email,
    sequenceId,
    variables,
    enrolledAt: new Date(),
    status: 'active',
    sentEmails: [],
  })
  
  // 2. Schedule emails based on delays
  const sequence = EMAIL_TEMPLATES[sequenceId]
  for (const emailTemplate of sequence.emails) {
    const sendAt = new Date()
    sendAt.setDate(sendAt.getDate() + emailTemplate.delay)
    
    await scheduleEmail({
      enrollmentId: enrollment.id,
      templateId: emailTemplate.template,
      sendAt,
      variables,
    })
  }
}

// Cron job: every hour, check for emails due to send
async function sendScheduledEmails() {
  const dueEmails = await db.scheduledEmails.find({
    sendAt: { $lte: new Date() },
    sentAt: { $exists: false }
  })
  
  for (const scheduled of dueEmails) {
    const enrollment = await db.emailEnrollments.findById(scheduled.enrollmentId)
    const template = await loadTemplate(scheduled.templateId)
    
    const html = fillVariables(template.html, enrollment.variables)
    const text = fillVariables(template.text, enrollment.variables)
    
    await sendEmail({
      to: enrollment.email,
      subject: fillVariables(template.subject, enrollment.variables),
      html,
      text,
    })
    
    scheduled.sentAt = new Date()
    scheduled.save()
  }
}
```

## Email Template Format

Each email template needs both text and HTML versions:

```json
{
  "compression_1": {
    "subject": "You have a compression cycle optimization opportunity",
    "preheader": "Here's what we found",
    "html": "<p>Hi {{first_name}},</p><p>In your recent assessment, we found that your compression cycle takes <strong>{{cycle_length}} weeks</strong>...</p>",
    "text": "Hi {{first_name}},\n\nIn your recent assessment, we found that your compression cycle takes {{cycle_length}} weeks...",
    "cta_text": "View your full results",
    "cta_link": "/assessment/results?gap={{gap_type}}&score={{gap_score}}"
  }
}
```

## Variable Substitution

Implement a simple template variable replacer:

```javascript
function fillVariables(template, variables) {
  let result = template
  
  // Replace all {{variable}} with values
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g')
    result = result.replace(regex, value || '')
  }
  
  // Default fallbacks for missing variables
  result = result.replace(/{{first_name}}/g, 'there')
  result = result.replace(/{{company}}/g, 'your company')
  
  return result
}
```

## Unsubscribe & Compliance

Every email must include:

1. **Unsubscribe link** — Using `{{unsubscribe_link}}`
2. **Company address** — In footer
3. **Double opt-in** — For new list subscribers

```html
<!-- Email footer -->
<footer>
  <p style="font-size: 12px; color: #999;">
    Blue Horizons Group | 123 Main St, San Francisco, CA 94102<br>
    <a href="{{unsubscribe_link}}">Unsubscribe</a>
  </p>
</footer>
```

## Suppression Rules

**Never email if:**
- Unsubscribed
- Bounced hard (invalid email)
- Marked as spam
- Opted out of marketing
- Already received 4+ emails in sequence

```javascript
async function shouldSendEmail(enrollment) {
  // Check suppression list
  if (enrollment.unsubscribed) return false
  if (enrollment.bounced) return false
  if (enrollment.spamComplaints > 0) return false
  
  // Check sequence progress
  if (enrollment.sentEmails.length >= 4) return false
  
  // Check rate limiting
  const lastEmailDate = enrollment.sentEmails[enrollment.sentEmails.length - 1]?.sentAt
  if (lastEmailDate && daysSince(lastEmailDate) < 1) return false  // Max 1/day
  
  return true
}
```

## Analytics & Tracking

Track these metrics to optimize:

| Metric | Goal | Action if Low |
|--------|------|---------------|
| **Send rate** | >95% (not bouncing) | Clean up email list |
| **Open rate** | >25% | Improve subject lines with agent |
| **Click rate** | >3% | Improve CTA copy/positioning |
| **Conversion** (click → contact form) | >5% of opens | Link to more relevant content |
| **Unsubscribe rate** | <1% | Too frequent or wrong audience |

**Tracking implementation:**

```javascript
// In email template, use tracking links
<a href="https://bhg.com/case-studies/fortune500?utm_campaign=compression_gap_seq&utm_email=comp_1&utm_token={{tracking_token}}">
  View case study
</a>

// Log opens via pixel
<img src="https://api.bhg.com/track/open?token={{tracking_token}}&email={{email}}" width="1" height="1" />

// Webhook: when user clicks tracking link or opens email
POST /api/webhooks/email-event
{
  "type": "click|open",
  "email": "john@acme.com",
  "campaign": "compression_gap_seq",
  "email_id": "comp_1"
}
```

## Resequencing Rules

**If lead re-engages during sequence:**

```javascript
function updateEnrollmentOnEvent(enrollment, event) {
  // If they click an email, restart sequence with newer content
  if (event.type === 'click' && enrollment.completedEmails < 2) {
    enrollment.lastEngaged = new Date()
    // Don't restart, just extend with related content
  }
  
  // If they submit contact form, stop sequence (sales takes over)
  if (event.type === 'contact_form') {
    enrollment.status = 'completed'
    enrollment.convertedAt = new Date()
    // Tag in CRM: "converted from nurture"
  }
  
  // If they unsubscribe, respect immediately
  if (event.type === 'unsubscribe') {
    enrollment.status = 'unsubscribed'
    // Remove from ALL future emails
  }
}
```

## Implementation Checklist

- [ ] Choose email service (Mailchimp, SendGrid, custom backend)
- [ ] Create email templates in your email service (using {{variables}})
- [ ] Set up automations/workflows in email service that trigger on tags/list membership
- [ ] Create enrollment function that calls email service API
- [ ] Wire `/api/assessment/submit` to call `enrollInNurtureSequence()`
- [ ] Wire `/api/contact` to call `enrollContactFormLead()`
- [ ] Implement variable substitution (fillVariables function)
- [ ] Test: submit assessment → verify email service has contact with correct tag
- [ ] Test: click email link → verify tracking/analytics work
- [ ] Set up monitoring: check bounce rate, spam complaints weekly
- [ ] Document: email templates, sequences, suppression rules for your team

## Success Metrics

| Goal | Target | Check |
|------|--------|-------|
| Enrollment rate (qualified leads → email) | >90% | Weekly |
| Email delivery rate | >95% | Daily |
| Open rate | >25% | Weekly |
| Click rate | >3% | Weekly |
| Conversion (email clicks → contact form) | >5% | Monthly |

## Cost Estimate

**Email service tiers (monthly):**
- SendGrid: Free up to 100 contacts, then $10-20/month for 10K
- Mailchimp: Free up to 5K contacts, then $20/month
- Custom backend: Hosting + Sendgrid credits = $20-50/month

**For 2-person team:** Budget $20-50/month for email service + infrastructure.

## Next Steps

1. **Choose email service** — Mailchimp (easiest setup) or SendGrid (most flexible)
2. **Create 4 email sequences** — Use the agent prompts from Phase 4A
3. **Deploy** — Add enrollment code to your assessment and contact form endpoints
4. **Test** — Submit assessment, verify email arrives with correct variables
5. **Monitor** — Weekly: check opens, clicks, bounces; Monthly: calculate conversion rate
6. **Optimize** — Use agent to refresh email copy quarterly, A/B test subject lines

---

## Summary: Phases 4A-4C Complete

| Phase | Output | Owner | Timeline |
|-------|--------|-------|----------|
| **4A - Content** | 4 blog posts/month + 1 email sequence refresh | AICR agents | Weekly |
| **4B - Scoring** | Leads auto-scored, routed to sales/nurture | Your backend | Real-time |
| **4C - Email** | Auto-enrolled in gap-specific nurture | Email service | Real-time |

**Result:** Fully automated lead generation → qualification → nurture system that scales with your 2-person team. Agents generate content, scoring routes leads, email nurtures automatically.

**Monthly effort:** 6-8 hours per person = 4 blogs + 1 email refresh + 1 case study + monitoring & optimization.
