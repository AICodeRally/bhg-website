# BHG Lead Scoring Guide — Phase 4B

Once content drives assessments and contact forms, you need lead scoring: rules that automatically categorize leads into "sales-ready," "nurture," and "not yet ready."

This guide explains how to score leads based on assessment responses and contact form data, so your sales team spends time on qualified prospects instead of cold outreach.

## Lead Score Model

Every lead gets a score from 0-100. Higher = more ready for sales contact.

**Score Bands:**

| Score | Stage | Sales Action | Nurture Action |
|-------|-------|--------------|-----------------|
| **80-100** | Sales Ready | Contact immediately | None (skip nurture) |
| **60-79** | Warm Lead | Contact within 1 week | Weekly nurture email |
| **40-59** | Nurture | Skip sales contact | Bi-weekly content + re-engagement |
| **0-39** | Not Ready | Skip both | Monthly thought leadership email |

## Scoring Factors

Combine assessment responses + contact form data to calculate score.

### 1. Gap Strength (0-50 points)

Score based on dominant gap's severity:

```javascript
// Pseudocode - your backend implements this
function scoreGapStrength(assessment) {
  const gaps = {
    compression: assessment.cycleLength > 6 ? assessment.cycleLength * 5 : 0,
    manualWork: assessment.manualWorkPercentage > 50 ? assessment.manualWorkPercentage : 0,
    visibility: assessment.visibilityScore < 3 ? (5 - assessment.visibilityScore) * 10 : 0,
    dataQuality: assessment.dataQuality < 3 ? (5 - assessment.dataQuality) * 10 : 0,
  }
  
  const dominantGap = Math.max(...Object.values(gaps))
  return Math.min(dominantGap, 50) // Cap at 50
}
```

**Examples:**
- Compression cycle = 10 weeks → 50 points (very painful)
- Compression cycle = 4 weeks → 20 points (already optimized)
- Manual work = 80% → 40 points (major pain)
- Manual work = 20% → 10 points (minor issue)

### 2. Job Title Fit (0-20 points)

Score based on decision-maker level:

```javascript
function scoreJobTitle(jobTitle) {
  const decisionMakers = {
    'VP': 20,
    'EVP': 20,
    'Director': 15,
    'Manager': 10,
    'Coordinator': 5,
    'Analyst': 5,
  }
  
  // Find first matching title level
  for (const [title, points] of Object.entries(decisionMakers)) {
    if (jobTitle.includes(title)) return points
  }
  return 5 // Default for unclear titles
}
```

**Job Title Mapping:**
- **VP/SVP/C-Suite:** 20 pts (buying decision maker)
- **Director:** 15 pts (strong influencer)
- **Manager (Finance/Sales Ops):** 10 pts (implementer)
- **Analyst/Coordinator:** 5 pts (researcher, may refer up)

### 3. Company Size (0-20 points)

Larger = more budget and urgency.

```javascript
function scoreCompanySize(companyName, industry) {
  // API call to Apollo or Clearbit to get company size
  // Or manual mapping if you know the companies
  
  const employees = lookupCompanySize(companyName)
  
  if (employees > 10000) return 20   // Enterprise
  if (employees > 1000) return 15    // Mid-market
  if (employees > 100) return 10     // SMB
  return 5                            // Startup
}
```

**Size Mapping:**
- **Enterprise (10K+):** 20 pts (budget available, urgent)
- **Mid-market (1K-10K):** 15 pts (good balance)
- **SMB (100-1K):** 10 pts (tighter budgets)
- **Startup (<100):** 5 pts (may not have SPM yet)

### 4. Engagement Level (0-10 points)

Track how much they've interacted with BHG content.

```javascript
function scoreEngagement(userId) {
  let points = 0
  
  points += 2 * (blogPostsViewed || 0)      // 2 pts per blog
  points += 3 * (caseStudiesViewed || 0)    // 3 pts per case study
  points += 2 * (emailsOpened || 0)         // 2 pts per email open
  points += 1 * (emailsClicked || 0)        // 1 pt per click
  
  return Math.min(points, 10) // Cap at 10
}
```

**Engagement Tracking:**
- Blog post view: +2 pts
- Case study view: +3 pts
- Email open: +2 pts
- Email click: +1 pt
- Assessment completion: +5 pts (already scored above)
- Contact form submission: +3 pts (already shows intent)

### 5. Response Quality (0-Bonus up to 5)

How complete/serious their submission is:

```javascript
function scoreResponseQuality(formData) {
  let bonus = 0
  
  if (formData.message && formData.message.length > 100) bonus += 2 // Detailed message
  if (formData.gap !== '') bonus += 1                              // Named specific gap
  if (formData.email.includes('@company.com')) bonus += 2          // Company email (not Gmail)
  
  return Math.min(bonus, 5)
}
```

**Quality Signals:**
- Detailed message (100+ chars): +2 pts
- Named specific gap: +1 pt
- Company email (not personal Gmail): +2 pts
- Quick response to nurture email: +1 pt

## Scoring Rules

### Assessment-to-Lead Scoring

When someone completes the assessment:

```javascript
function scoreAssessmentLead(assessment) {
  const gapScore = scoreGapStrength(assessment)
  const emailScore = assessment.email ? 0 : -10  // -10 if no email provided
  const contactFollowUp = assessment.contactFollowUp ? 5 : 0
  
  let total = gapScore + emailScore + contactFollowUp
  return Math.max(0, Math.min(100, total))
}
```

**Example Assessment Scoring:**
- Assessment only (no contact info): 30-50 pts (nurture)
- Assessment + email provided: 40-60 pts (warm lead)
- Assessment + "contact me" checked: 60-80 pts (sales ready)

### Contact Form Scoring

When someone fills out contact form:

```javascript
function scoreContactFormLead(formData, companyData) {
  let score = 0
  
  score += scoreGapStrength(formData)          // 0-50 (gap severity from form context)
  score += scoreJobTitle(formData.jobTitle)    // 0-20 (not in form, infer from email domain)
  score += scoreCompanySize(formData.company)  // 0-20
  score += scoreResponseQuality(formData)      // 0-5
  
  return Math.min(100, score)
}
```

**Example Contact Form Scoring:**
- Direct inquiry, no context: 30-40 pts (nurture)
- Named specific problem + company email: 60-70 pts (warm)
- VP+ title, clear gap, large company: 80-95 pts (sales ready)

## Lead Routing Rules

Once scored, automatically route to correct action:

### Sales-Ready (80-100)

**Automatic Actions:**
1. Add to Salesforce/HubSpot as new lead
2. Tag with gap type + score band
3. Assign to sales team (round-robin)
4. Trigger "Welcome" email from sales
5. Create Salesforce task: "Contact within 24 hours"

**Timing:** Contact within 24 hours (hot lead)
**Message:** "I saw your assessment — let's talk about compressing your cycle"

### Warm Lead (60-79)

**Automatic Actions:**
1. Add to CRM with "warm lead" tag
2. Enroll in gap-specific nurture sequence (2x/week)
3. Create Salesforce task: "Contact within 1 week"
4. Suppress aggressive outreach (1 sales email/week max)

**Timing:** Contact within 1 week
**Message:** "We work with similar companies on this exact challenge — want to chat?"

### Nurture (40-59)

**Automatic Actions:**
1. Add to CRM with "nurture" tag
2. Enroll in general nurture sequence (2x/month)
3. Track engagement (opens, clicks, etc.)
4. Requalify monthly: if engagement jumps, escalate to warm lead
5. No direct sales outreach

**Content:** Blog posts, case studies, ROI calculator tips

### Not Ready (0-39)

**Automatic Actions:**
1. Add to CRM with "awareness" tag
2. Enroll in thought leadership sequence (1x/month)
3. Track as long-term prospect
4. No sales outreach
5. Requalify quarterly: if engagement signals change, move to nurture

**Content:** Industry trends, benchmarks, educational guides

## Example Lead Scoring Workflows

### Example 1: Assessment Lead (No Contact Info)

```
Assessment submitted:
- Cycle length: 9 weeks → 45 pts
- Manual work: 70% → 35 pts (capped at 50, so 35)
- Visibility score: 2 → 30 pts (capped, so 20 max)
- Data quality: 2 → 20 pts (capped, so 20 max)

TOTAL: Dominant gap (compression) = 45 pts
Action: NURTURE (40-59 band)
→ Email nurture sequence triggered
→ 2x/week compression-focused emails
→ Suppress sales outreach
→ Track re-engagement
```

### Example 2: Contact Form (VP + Enterprise)

```
Contact form submitted:
- Name: John Smith
- Title: VP Sales Operations
- Company: Fortune 500 Tech (12,000 employees)
- Gap: "Compression cycle"
- Message: "We're stuck at 8 weeks. Costs us $2M/year in lost forecast accuracy..."

Scoring:
- Gap strength (8-week cycle): 40 pts
- Job title (VP): 20 pts
- Company size (Enterprise): 20 pts
- Response quality (detailed message): 2 pts
- Engagement bonus (email domain @company.com): 2 pts

TOTAL: 84 pts
Action: SALES READY (80-100 band)
→ Create Salesforce lead, assign to rep
→ Trigger immediate follow-up email from sales
→ Task: "Contact within 24 hours"
→ Note: "High-value enterprise prospect, quantified problem"
```

### Example 3: Blog Reader → Assessment → Contact

```
Timeline:
- Day 1: Read blog "5 Ways to Get More From Anaplan" → +2 pts engagement
- Day 3: View 2 case studies → +6 pts engagement
- Day 5: Take assessment → 45 pts (gap strength)
- Day 6: Fill contact form

Cumulative scoring:
- Gap strength: 45 pts
- Engagement: 8 pts
- Response quality: 3 pts
- Estimated job title (researched): 10 pts

TOTAL: 66 pts
Action: WARM LEAD (60-79 band)
→ Add to CRM, assign nurture sequence
→ Task: "Contact within 1 week"
→ Message: "I saw you explored our Anaplan guide..."
```

## Implementation Checklist

Your backend will need to:

- [ ] Create `leads` table with fields: email, name, company, gapType, gapScore, contactFormData, assessmentData, leadScore, scoringBreakdown, dateScored, lastEngagementDate
- [ ] Create scoring function that takes assessment or contact data
- [ ] Create routing logic: if score > 80, send to CRM; if 60-79, add to nurture; etc.
- [ ] Create engagement tracking: blog views, email opens, case study visits, assessment completion
- [ ] Add requalification cron: monthly for warm leads, quarterly for nurture
- [ ] Wire to CRM: create leads/contacts, assign to sales team, create tasks
- [ ] Create dashboard for your team: see leads by score band, requalification history

## Success Metrics

Track these to optimize your scoring model:

| Metric | Target | Owner |
|--------|--------|-------|
| % of sales-ready leads that convert (contact → meeting) | >40% | Sales team |
| Avg. time from assessment to sales contact | <24 hrs | Sales ops |
| Score accuracy (% leads classified correctly) | >85% | You |
| % of warm leads that requalify to sales-ready | >15%/month | Sales ops |

## Next: Phase 4C (Email Automation)

Once leads are scored, automatically enroll them in nurture sequences based on their gap type. See `EMAIL_AUTOMATION_GUIDE.md`.
