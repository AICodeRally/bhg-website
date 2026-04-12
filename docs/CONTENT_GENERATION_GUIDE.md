# BHG Content Generation Guide — For Your Agents

This guide explains how to use AICR agents to generate blog posts, email sequences, and case studies for BHG's marketing system. All content is agentic-first: agents do the heavy lifting, your 2-person team reviews and publishes.

## Overview

Three content types drive the marketing funnel:

| Type | Purpose | Frequency | Owner |
|------|---------|-----------|-------|
| **Blog Posts** | SEO + nurture + thought leadership | 2-4/month | Agent (you review) |
| **Email Copy** | Nurture sequence variants | 1 set/gap type | Agent (you review) |
| **Case Studies** | Proof + differentiation | 1-2/month | Agent (you review + validate) |

## Blog Post Generation

### When to Generate

- Monthly content calendar (see below)
- Triggered by assessment gap trends (e.g., 60% of leads have "Compression" gap → generate compression blog post)
- Based on seasonal events or industry news

### Monthly Content Calendar

**April 2026:**
- Week 1: "5 Ways to Get More From Your Anaplan Investment" (Anaplan platform guide)
- Week 2: "Compression Cycle Benchmarks 2026" (Industry data + BHG POV)
- Week 3: "The Hidden Cost of Manual Comp Processes" (Pain point deep dive)
- Week 4: "How to Audit Your SPM Data Quality" (Diagnostic + self-serve)

**May 2026:**
- Week 1: "Varicent Designer: Common Setup Mistakes" (Platform-specific guide)
- Week 2: "Comp Plan Changes Without Breaking Your System" (Operational how-to)
- Week 3: "Building a Comp Data Dictionary" (Governance + standardization)
- Week 4: "Case study: How [Company] Compressed Their Cycle" (Social proof)

### Agent Prompt Template for Blog Post

**Input to Agent:**

```
Generate a blog post for Blue Horizons Group's marketing website.

Topic: "[TOPIC]"
Platform(s): [Anaplan/Varicent/NetSuite/General]
Gap Focus: [Compression/ManualWork/Visibility/DataQuality]
Audience: [Finance leaders/Sales ops/IT/Implementation teams]
Goal: [SEO keyword ranking / Lead nurture / Thought leadership / Self-serve diagnosis]
Length: 1200-1500 words
Tone: Expert but not patronizing. Practical. Evidence-based.

Outline you MUST follow:
1. Hook (Why this matters, opening stat or scenario)
2. The Challenge (What goes wrong, symptoms, cost)
3. Root Causes (Why it happens, common mistakes)
4. The Approach (How to fix it, step-by-step)
5. Expected Outcomes (Before/after metrics, timeline)
6. Next Steps (CTA: assessment, contact form, related blog post)

Additional Instructions:
- Use real examples but anonymize company names
- Include 1-2 specific metrics (cite source if possible, or use realistic ranges)
- Mention BHG approach without being salesy (1-2 sentences max)
- End with CTA link (use /assessment or /contact)
- Format: markdown (# H1, ## H2, - bullet, **bold**)
- Avoid: Generic advice, overly technical jargon, vendor lock-in messaging
```

**Output Structure (JSON):**

```json
{
  "id": "generated_2026_04_15",
  "slug": "five-ways-to-get-more-from-anaplan",
  "title": "5 Ways to Get More From Your Anaplan Investment",
  "excerpt": "Most companies deploy Anaplan correctly but never unlock its full potential. Here's how to extract 10x ROI from your existing implementation.",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-15T00:00:00Z",
  "category": "Anaplan",
  "featured": false,
  "readTime": 7,
  "content": "# 5 Ways to Get More From Your Anaplan Investment\n\n[Full markdown content here]",
  "tags": ["anaplan", "optimization", "roi", "configuration"]
}
```

### Publishing Blog Posts

1. **Review:** Agent generates → you read for accuracy/tone
2. **Add to JSON:** Use `/api/blog/publish` endpoint (coming) or manually add to `public/blog-posts.json`
3. **Deploy:** Commit + push → Vercel redeploys → live in 3 min

```bash
# Manual approach (fast for now):
# 1. Edit public/blog-posts.json
# 2. Add new object to array
# 3. git add public/blog-posts.json
# 4. git commit -m "content: add blog post [slug]"
# 5. git push
```

## Email Copy Generation

### When to Generate

- One full sequence per gap type (4 total: Awareness, Compression, ManualWork, DataQuality)
- Regenerate existing sequences with new variations every quarter
- Quick refreshes based on seasonal themes

### Agent Prompt Template for Email Sequence

**Input to Agent:**

```
Generate email copy for a 4-email nurture sequence for Blue Horizons Group.

Sequence Type: [Awareness / Compression Gap / Manual Work Gap / Visibility Gap / Data Quality Gap]
Recipient Persona: [Finance leader / Sales ops leader / IT director / VP Sales]
Goal: Move from "[Initial stage]" to "[Next stage]"
Tone: Consultant (helpful, expert, not pushy)
Brand Voice: Professional but warm. Data-driven. Action-oriented.

Email Structure (you MUST generate all 4):

Email 1 - Day 0 (Immediate):
  Subject: Hook the immediate pain
  Body: Acknowledge their situation, introduce BHG POV, soft intro to solution
  CTA: [Read case study / Schedule 15-min call / Take assessment]

Email 2 - Day 3:
  Subject: Social proof angle
  Body: Real example (anonymized), metrics, how similar company solved it
  CTA: [Read full case study / See results / Schedule demo]

Email 3 - Day 7:
  Subject: Educational content
  Body: Teach something valuable (not sales pitch), actionable framework
  CTA: [Download guide / Join webinar / Take assessment]

Email 4 - Day 14:
  Subject: Urgency + value
  Body: Cost of delay, path forward, clear next step
  CTA: [Schedule optimization call / Take assessment / Book consultation]

Variables to include:
- {{first_name}} - Recipient first name
- {{company}} - Company name
- {{gap_type}} - The gap type (from assessment)
- {{gap_score}} - The score (0-100)

Avoid: Generic sales copy, false urgency, multiple CTAs per email, mention of competitors
```

**Output Structure (JSON):**

```json
{
  "id": "compression-gap-seq-v2",
  "name": "Compression Gap Nurture",
  "description": "For leads identified with compression cycle challenges",
  "emails": [
    {
      "id": "compression_1",
      "order": 1,
      "delay": 0,
      "subject": "Your compression cycle is costing you $X per month",
      "preheader": "Here's the math",
      "body": "[Full email body with {{variables}}]",
      "cta_text": "See how we helped similar companies",
      "cta_link": "/case-studies/[case-study-slug]"
    },
    // ... 3 more emails
  ]
}
```

### Publishing Email Sequences

1. **Generate:** Agent writes 4 emails with variables
2. **Review:** You read for tone, accuracy, brand fit
3. **Update JSON:** Replace sequence in `public/email-templates.json`
4. **Integrate:** Your backend uses template on form submission

## Case Study Generation

### When to Generate

- 1 new case study every 1-2 months
- Based on real client work with permission to publish
- Alternate between platforms (Anaplan, Varicent, NetSuite, Incent)

### Agent Prompt Template for Case Study

**Input to Agent:**

```
Generate a case study for Blue Horizons Group's website.

Context:
- Client: [Company name or anonymized: "Fortune 500 Tech Company"]
- Platform: [Anaplan/Varicent/NetSuite/Incent]
- Industry: [Technology/Financial Services/Retail/Healthcare]
- Company Size: [Enterprise/Mid-market/SMB]
- Gap Solved: [Compression/ManualWork/Visibility/DataQuality/All]
- Timeline: [3 months / 6 months / 12 months]

Challenge (what you learned):
- [Specific problem they faced before BHG]
- [Root cause, not symptoms]
- [Impact on business]

Solution (what BHG did):
- [Methodology steps]
- [Key decisions made]
- [Tools/platforms used]
- [Team composition]

Results (quantified outcomes):
- Metric 1: [Before] → [After] = [% or $ impact]
- Metric 2: [Before] → [After] = [% or $ impact]
- Metric 3: [Before] → [After] = [% or $ impact]

Testimonial (from client):
- Quote: "[Real or realistic quote from client]"
- Attribution: [Name, Title, Company]

Tone: Professional, specific, humble (BHG enabled them, client did the work)
Avoid: Generic praise, undefined metrics, vendor bashing, overhyping
```

**Output Structure (JSON):**

```json
{
  "id": "cs_2026_04_fortune500tech",
  "slug": "fortune-500-tech-compression-cycle",
  "title": "[Company]: Compressed Comp Cycle from 8 Weeks to 3",
  "platform": "Anaplan",
  "industry": "Technology",
  "companySize": "Enterprise",
  "excerpt": "How a Fortune 500 tech company reduced compression cycles by 62% and eliminated 200+ manual hours per month.",
  "challenge": {
    "title": "8-Week Compression Cycle Blocking Financial Close",
    "description": "[1-2 sentence overview]",
    "bullets": [
      "[Specific challenge 1]",
      "[Specific challenge 2]",
      "[Specific challenge 3]"
    ]
  },
  "solution": {
    "title": "Streamlined Data Validation, Optimized Workflows",
    "description": "[How BHG approached the problem]",
    "approach": "[2-3 paragraph narrative of methodology]"
  },
  "results": [
    {
      "metric": "Compression Cycle",
      "before": "8 weeks",
      "after": "3 weeks",
      "impact": "62% reduction, $500K annual savings"
    },
    // ... 2-3 more metrics
  ],
  "roi": {
    "annualSavings": 500000,
    "breakdown": ["Labor savings", "Faster close", "Reduced errors"],
    "paybackPeriod": "4 months"
  },
  "testimonial": {
    "quote": "[Client quote]",
    "attribution": "Name, Title, Company"
  },
  "nextSteps": [
    "Step 1: Define your compression cycle process",
    "Step 2: Audit your current data flows",
    "Step 3: Implement automated validation"
  ]
}
```

## Publishing Workflow (Simple)

**For all content types:**

1. **Request:**
   - Use AICR agent console
   - Paste the appropriate prompt template above
   - Set context: "This is for Blue Horizons Group marketing"

2. **Review (15 min):**
   - Read agent output
   - Check: accuracy, brand voice, no vendor lock-in messaging
   - Request revisions if needed (e.g., "Make this more consultative, less salesy")

3. **Publish (5 min):**
   - Blog: Add to `public/blog-posts.json` → commit → push
   - Email: Update `public/email-templates.json` → commit → push
   - Case study: Add to `public/case-studies.json` → commit → push
   - Vercel redeploys automatically

4. **Promote (ongoing):**
   - Link new blog posts in email sequences
   - Add case studies to homepage rotation
   - Tag related content in blog archive

## Monthly Content Cadence (2-person team)

**Week 1:** Plan next 4 weeks of content
- Review assessment trends (which gaps most common?)
- Pick 4 blog topics
- Request 1 email sequence refresh
- Identify 1 case study to write

**Week 2:** Generate + Review
- Agent generates 4 blog posts (1-2 hours to review)
- Agent generates 1 email sequence (30 min to review)
- Create case study outline together

**Week 3:** Publish + Promote
- Add 4 blogs to JSON, commit, deploy
- Update email sequence JSON
- Promote in email, Twitter, blog archive

**Week 4:** Case study finish + Next month planning
- Finalize case study, publish
- Review analytics from last month
- Plan next month topics

**Total time commitment:** ~6-8 hours/month for 2 people
**Output:** 4 blog posts + 1 email refresh + 1 case study = massive content engine

## Success Metrics

Track these to know if content automation is working:

| Metric | Target | Check Monthly |
|--------|--------|----------------|
| Blog views → assessment clicks | 5% | Google Analytics |
| Assessment completions → contact form | 8% | Dashboard data |
| Email opens (by gap type) | >25% | Email service analytics |
| Email clicks to case studies | >3% | Email service analytics |
| Case study views → contact form | 12% | Google Analytics |

## Next: Phase 4B (Lead Scoring)

Once content is flowing, add lead scoring rules so your sales team gets qualified leads, not raw volume. See `LEAD_SCORING_GUIDE.md`.
