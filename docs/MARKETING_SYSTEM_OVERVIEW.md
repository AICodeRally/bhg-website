# BHG Marketing System — Complete Overview

## What You Have

A complete, agentic-first lead generation and nurture system for a 2-person marketing team.

**Phase 1-3: Website & Lead Capture (DONE)**
- Homepage (ecosystem vendor positioning)
- Assessment quiz (5 min, self-qualifying)
- Solutions page (value prop by gap type)
- Contact form (direct lead capture)
- Blog system (4 articles, SEO + nurture)
- ROI calculator (interactive, formula-driven)
- Internal lead dashboard (search, filter, export)
- Email template structures (ready for sequences)

**Phase 4: Automation Guides (DONE)**
- Content generation (blog posts, emails, case studies via agents)
- Lead scoring (auto-qualify leads, route to sales/nurture)
- Email automation (auto-enroll by gap type, schedule sends)

## The Funnel (How It Works)

```
AWARENESS
├─ Homepage hero
├─ Blog posts (SEO traffic)
└─ LinkedIn/Twitter posts

↓

INTEREST
├─ Read blog → Click "Take Assessment"
└─ Direct visit → /assessment or /contact

↓

QUALIFICATION (Assessment or Contact Form)
├─ Assessment: 5 questions → gap identified → auto-score
└─ Contact form: name/email/company/message → auto-score

↓

LEAD SCORING (Your Backend)
├─ Gap strength (0-50 pts)
├─ Job title fit (0-20 pts)
├─ Company size (0-20 pts)
├─ Engagement (0-10 pts)
└─ Response quality (0-5 pts bonus)
    ↓
    = SCORE (0-100)

↓

ROUTING (Your Backend)
├─ Sales-Ready (80+) → CRM, assign to sales, contact 24h
├─ Warm (60-79) → CRM, nurture 2x/week, contact in 1 week
├─ Nurture (40-59) → Email sequence 2x/month, no sales contact
└─ Not Ready (0-39) → Thought leadership 1x/month, long-term

↓

NURTURE (Email Service)
├─ Awareness sequence (4 emails, if no gap identified)
├─ Compression Gap sequence (4 emails, if compression > 6wks)
├─ Manual Work Gap sequence (4 emails, if manual > 50%)
└─ Visibility Gap sequence (4 emails, if visibility < 3)
    ↓
    Delay: Day 0, Day 3, Day 7, Day 14

↓

CONVERSION
├─ Email click → Related blog/case study
├─ Case study view → Contact form submission
├─ Contact form → Lead escalated to sales (if score > 60)
└─ Assessment → Sales-ready if gap clear + company size OK

↓

SALES HANDOFF
└─ Your sales team contacts (email + call) → meeting → deal
```

## Files & Structure

### Frontend (Published)

```
app/(public)/
├─ page.tsx                      # Homepage (ecosystem positioning)
├─ assessment/page.tsx           # Assessment quiz
├─ assessment/results/page.tsx   # Assessment results
├─ solutions/page.tsx            # Solution pages by gap type
├─ blog/page.tsx                 # Blog listing
├─ blog/[slug]/page.tsx          # Blog detail page
├─ roi-calculator/page.tsx       # Interactive ROI tool
├─ case-studies/page.tsx         # Case study grid
├─ case-studies/[slug]/page.tsx  # Case study detail
├─ contact/page.tsx              # Contact form
└─ why-bhg/page.tsx              # Why BHG page

api/
├─ assessment/submit/route.ts    # Assessment analysis endpoint
├─ contact/route.ts              # Contact form endpoint
└─ dashboard/leads/route.ts       # Lead list endpoint (dashboard)

dashboard/
└─ leads/page.tsx                # Internal lead dashboard

public/
├─ blog-posts.json               # 4 blog articles
├─ case-studies.json             # 3 case studies
├─ assessment-data.json          # Quiz questions + gap definitions
├─ email-templates.json          # 4 email sequences (12 emails)
└─ content.json                  # Homepage content
```

### Backend Integration Points (Your Code)

```
Your Backend Should Handle:

1. PERSISTENCE
   POST /api/assessment/submit
   POST /api/contact
   → Save to your database

2. LEAD SCORING
   assessmentData + contactData
   → Calculate 0-100 score
   → Classify: Sales-Ready / Warm / Nurture / Not-Ready

3. ROUTING
   score > 80 → Create lead in CRM (HubSpot/Salesforce)
   score > 80 → Assign to sales rep
   score > 80 → Create calendar reminder "Contact within 24h"
   score 60-79 → Add to nurture sequence
   score < 60 → Add to awareness sequence

4. EMAIL ENROLLMENT
   gap_type + score + email
   → Enroll in appropriate sequence (Mailchimp/SendGrid API)
   → Send welcome email immediately
   → Schedule day 3, 7, 14 emails
```

## Implementation Roadmap

### Week 1: Database + Persistence
- [ ] Create `leads` table (email, name, company, gap_type, score, etc.)
- [ ] Create `email_enrollments` table (tracking which sequence each lead is in)
- [ ] Wire `/api/assessment/submit` to save to database
- [ ] Wire `/api/contact` to save to database
- [ ] Verify: submit assessment → data appears in your DB

### Week 2: Lead Scoring
- [ ] Create scoring function (see LEAD_SCORING_GUIDE.md)
- [ ] Calculate score on form submission
- [ ] Add to database: `score`, `scoringBreakdown`, `scoreBand`
- [ ] Create routing rules (see guide)
- [ ] Test: submit assessment → score calculated correctly

### Week 3: CRM Integration
- [ ] Connect to HubSpot/Salesforce API
- [ ] Auto-create lead if score > 60
- [ ] Auto-assign to sales rep
- [ ] Auto-create task "Contact within 24h" if score > 80
- [ ] Test: submit assessment → appears in CRM within 2 min

### Week 4: Email Service Integration
- [ ] Choose email service (Mailchimp/SendGrid recommended)
- [ ] Create 4 email sequences in email service
- [ ] Create 12 email templates with {{variables}}
- [ ] Build enrollment function (see EMAIL_AUTOMATION_GUIDE.md)
- [ ] Wire to assessment/contact endpoints
- [ ] Test: submit assessment → receive email day 0

### Week 5: Content Generation (Ongoing)
- [ ] Request first batch of blog posts from AICR agents (see CONTENT_GENERATION_GUIDE.md)
- [ ] Review + approve
- [ ] Add to blog-posts.json → deploy
- [ ] Request email sequence variations
- [ ] Publish, monitor clicks/conversions

### Week 6: Monitoring + Optimization
- [ ] Dashboard: leads by score band, conversion rates
- [ ] Email analytics: opens, clicks, unsubscribes
- [ ] Blog analytics: traffic, assessment CTR
- [ ] Monthly report: top converting content, lead sources
- [ ] Agent request: refresh email copy based on low-open content

## Quick Commands

```bash
# Develop locally
pnpm dev                           # Start dev server (localhost:3000)
curl http://localhost:3000/assessment   # Test pages load

# Check TypeScript
npm run typecheck                  # Verify no type errors

# Deploy
git add .                          # Stage your changes
git commit -m "feat: ..."          # Commit
git push                           # Push to GitHub
# Vercel auto-deploys on push

# Test API endpoints
curl -X POST http://localhost:3000/api/assessment/submit \
  -H "Content-Type: application/json" \
  -d '{...}'

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## Success Metrics (Track Monthly)

| Metric | Target | Owner | Tool |
|--------|--------|-------|------|
| Homepage visits | Growing | Marketing | Google Analytics |
| Assessment completions | >200/month | Content + Ads | Dashboard |
| Assessment → Contact form | >10% | CTA copy | Dashboard |
| Contact form → Sales contact | >80% (if scored right) | Sales ops | Salesforce |
| Email open rate | >25% | Email copy | Email service |
| Email → Contact form | >5% of opens | Email CTAs | Email service |
| Blog views | Growing | SEO + Content | Google Analytics |
| Blog → Assessment | >2% | CTA placement | Google Analytics |

## Cost Breakdown (Monthly)

| Item | Cost | Notes |
|------|------|-------|
| Domain | $12 | bhg.com |
| Hosting | $0 | Vercel (free tier) |
| Database | $15-30 | Supabase/Neon |
| Email service | $20-50 | Mailchimp/SendGrid |
| CRM | $50-200 | HubSpot/Salesforce |
| **Total** | **$97-292** | ~$1,200-3,500/year |

## Team Responsibilities

### Your Role (Todd / Zach)

- [ ] Review blog posts generated by agents (30 min/week)
- [ ] Approve email sequences (30 min/week)
- [ ] Monitor dashboards (30 min/week)
- [ ] Iterate on messaging based on data (30 min/week)
- [ ] Request new content from agents monthly (30 min/month)
- [ ] Approve case studies (1 hr/month)

**Weekly time: 2 hours**
**Monthly time: 2.5 hours**

### AICR Agent Role (Agentic-First)

- Generate 4 blog posts/month (Agent writes, you review)
- Generate email copy variations (Agent refreshes quarterly)
- Generate case studies (Agent outlines, you validate)
- Analyze assessment data (Agent identifies content gaps)
- Monitor performance (Agent flags low-performing content)

### Backend Team Role (Your Backend Developer)

- Database schema & persistence
- Lead scoring logic
- CRM integration
- Email service integration
- Analytics dashboard
- Monitoring & alerts

## Key Decision Points

**1. Email Service**
- Option A: Mailchimp (free for <5K contacts, easiest setup)
- Option B: SendGrid (more flexible, $10-20/month)
- Recommendation: Start Mailchimp, migrate to SendGrid if you need more advanced automation

**2. CRM**
- Option A: HubSpot (free CRM, $50/month sales automation)
- Option B: Salesforce (enterprise, $165/month)
- Recommendation: Start HubSpot free, upgrade to paid when you have 50+ sales-ready leads/month

**3. Content Frequency**
- Option A: 2 blogs/month (conservative, 4-5 hours effort)
- Option B: 4 blogs/month (recommended, 8-10 hours effort)
- Recommendation: Start with 4, pull back if unmanageable

**4. Lead Quality vs. Quantity**
- Option A: High scoring threshold (80+) = fewer leads, all sales-ready = less nurture
- Option B: Lower threshold (60+) = more leads, more nurture needed = bigger email list
- Recommendation: Start 70+ for sales contact, nurture everything 40+

## Troubleshooting

**Assessment submissions not appearing in database?**
- Check: Is `/api/assessment/submit` wired to your database save?
- Check: Are there errors in logs?
- Test: Submit form, check console for network response

**Emails not being sent?**
- Check: Is email service credentials configured?
- Check: Are email templates created in email service?
- Test: Manually trigger one email, verify it sends

**Lead scoring off?**
- Check: Are you calculating score formula correctly? (See LEAD_SCORING_GUIDE.md)
- Check: Are assessment responses parsing correctly?
- Test: Submit assessment with known values, verify score matches expectations

**Blog traffic to assessment not converting?**
- Check: Is CTA button visible and clickable?
- Check: Is /assessment page loading (check Console for JS errors)?
- A/B test: Try different CTA text ("Take Assessment" vs "See Your Gaps")

## Support & Documentation

- **Phase 4A:** Content Generation → docs/CONTENT_GENERATION_GUIDE.md
- **Phase 4B:** Lead Scoring → docs/LEAD_SCORING_GUIDE.md
- **Phase 4C:** Email Automation → docs/EMAIL_AUTOMATION_GUIDE.md

## Next Phase Ideas (Phase 5+)

- **Analytics Dashboard** — Real-time funnel visibility
- **Content Calendar UI** — Manage monthly topics, assign to agents
- **A/B Testing** — Email subject lines, landing page variants
- **Lead Insights** — Which blogs convert best, which industries
- **Competitive Monitoring** — Track when competitors mention you
- **Integration** — Slack notifications on sales-ready leads, Twitter DMs

---

**Status:** Ready to deploy and integrate with your backend.

All frontend code is production-ready, all API contracts are defined, all documentation for backend integration is complete.

Next step: Backend team implements database → lead scoring → CRM integration → email automation.

Good luck! 🚀
