# BHG Monthly Content Playbook — Q2-Q3 2026

Your concrete month-by-month plan for blog posts, emails, and case studies. Each section has copy-paste-ready prompts for AICR agents.

## How to Use This Document

**Each month:**
1. Read the month's section (e.g., "April 2026")
2. Copy each prompt (Blog, Email, Case Study sections)
3. Paste into AICR agent console
4. Review agent output (15 min)
5. Add to JSON files + deploy

**Total effort:** 6-8 hours/month for 4 blogs + 1 email refresh + 1 case study.

---

## April 2026 (Month 1)

**Theme:** "Getting Started with SPM Optimization"
**Goal:** Drive assessment traffic from top-of-funnel awareness content

### Blog Post 1: "5 Ways to Get More From Your Anaplan Investment"

**Prompt to copy/paste:**

```
Generate a blog post for Blue Horizons Group's marketing website.

Topic: "5 Ways to Get More From Your Anaplan Investment"
Platform: Anaplan
Gap Focus: Visibility & Forecasting
Audience: Finance leaders, FP&A teams, Anaplan admins
Goal: SEO keyword ranking + lead nurture
Length: 1200-1500 words
Tone: Expert but not patronizing. Practical. Evidence-based.

Outline you MUST follow:
1. Hook (Why this matters, opening stat or scenario)
2. The Challenge (What goes wrong, symptoms, cost)
3. Root Causes (Why it happens, common mistakes)
4. The Approach (How to fix it, step-by-step)
5. Expected Outcomes (Before/after metrics, timeline)
6. Next Steps (CTA: assessment, contact form, related blog post)

Specific angles to explore:
- Anaplan configurations that get missed during implementation
- Common report structures and why they fail
- Time-saving tricks for model validation
- How to avoid data reconciliation loops

Additional Instructions:
- Use real examples but anonymize company names
- Include 2-3 specific metrics (cite Gartner or realistic ranges)
- Mention BHG approach without being salesy (1-2 sentences max)
- End with CTA: "/assessment" link
- Format: markdown (# H1, ## H2, - bullet, **bold**)
- Avoid: Generic advice, overly technical jargon, vendor lock-in messaging

JSON Output Format:
{
  "id": "blog_2026_04_15_anaplan",
  "slug": "five-ways-get-more-from-anaplan",
  "title": "[Agent generates title]",
  "excerpt": "[1-2 sentence excerpt]",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-15T00:00:00Z",
  "category": "Anaplan",
  "featured": false,
  "readTime": 7,
  "content": "[Full markdown content]",
  "tags": ["anaplan", "optimization", "roi", "configuration"]
}
```

**Expected output:** ~1,300-word blog post
**Action when complete:** Add to `public/blog-posts.json` → commit → deploy

---

### Blog Post 2: "Compression Cycle Benchmarks 2026"

**Prompt:**

```
Generate a blog post for Blue Horizons Group's marketing website.

Topic: "Compression Cycle Benchmarks 2026: Where Does Your Company Stand?"
Platform: General (vendor-agnostic)
Gap Focus: Compression Cycle
Audience: CFOs, Sales leaders, Comp ops leaders
Goal: Thought leadership + assessment driver
Length: 1200-1500 words
Tone: Data-driven researcher sharing insights. Not sales-focused.

Outline you MUST follow:
1. Hook (Opening stat: "60% of companies still compress in 8+ weeks")
2. The Benchmarks (Industry averages by company size/industry)
3. Cost Analysis (What compression cycles cost per week)
4. Root Causes (Why most don't compress below 4 weeks)
5. Compression Paths (3 realistic approaches: quick wins, moderate, intensive)
6. Expectations (Timeline, effort, team size needed for each)
7. Next Steps (CTA: "Discover your company's gap" → assessment)

Data to reference:
- Gartner's 2025 SPM survey
- Simon-Kucher commission acceleration research
- Real benchmarks: Enterprise avg 6-8 weeks, Mid-market 5-7 weeks, SMB 4-6 weeks
- Cost formula: (salary_budget * cycle_weeks / 52) = annual cost

Additional Instructions:
- This is BENCHMARK research, so be credible and data-forward
- Cite sources (Gartner, Forrester, academic research)
- No BHG mentions in body (save for CTA)
- Include a benchmarking tool/calculator visual (describe for markdown)
- End with: "Take our 5-minute assessment to see where your company stands"
- Tone: Researcher, not marketer
- Format: markdown (# H1, ## H2, - bullet, **bold**, tables for data)

JSON Output Format:
{
  "id": "blog_2026_04_20_benchmarks",
  "slug": "compression-cycle-benchmarks-2026",
  "title": "[Agent generates]",
  "excerpt": "[1-2 sentences]",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-20T00:00:00Z",
  "category": "Benchmarks",
  "featured": true,
  "readTime": 8,
  "content": "[Full markdown with tables/data]",
  "tags": ["benchmarks", "compression", "roi", "industry-data"]
}
```

**Expected output:** ~1,400-word benchmark research post
**Action:** Add to JSON, tag as featured (featured: true)

---

### Blog Post 3: "Hidden Cost of Manual Comp Processes"

**Prompt:**

```
Generate a blog post for Blue Horizons Group's marketing website.

Topic: "The Hidden Cost of Manual Comp Processes: A CFO's Guide"
Platform: General
Gap Focus: Manual Work
Audience: CFOs, Finance ops leaders, Audit/compliance
Goal: Pain-point education + lead nurture
Length: 1000-1300 words
Tone: CFO-to-CFO consulting voice. Serious about compliance/risk.

Outline you MUST follow:
1. Hook (Stat: "80% of comp teams still use spreadsheets for critical calculations")
2. The Hidden Costs (not just time, but risk/compliance/liability)
   a. Direct cost (labor hours)
   b. Error cost (overpayment/underpayment exposure)
   c. Compliance cost (audit readiness, regulatory risk)
   d. Opportunity cost (what else team could do)
3. Real Example Scenario (anonymized story of a company's failure)
4. Why It's Hard to Fix (resistance, legacy systems, fear)
5. The Path Forward (3 realistic steps)
6. ROI Timeline (when do you recover the investment?)
7. Next Steps (CTA: "Audit your current risk" → assessment)

Specific angles:
- Sarbanes-Oxley / SOX compliance angles
- SEC disclosure requirements
- Internal audit findings (from your experience)
- Employee litigation risk from comp errors
- Privacy/data security when data lives in spreadsheets

Additional Instructions:
- Tone: Serious but not alarmist. Your peer, not a salesperson.
- Use real compliance references (SOX, SEC, HIPAA if applicable)
- Include a risk assessment checklist (5-7 questions)
- Anonymize any real company references
- CTA: "Is your comp process audit-ready? Find out in 5 minutes"
- Format: markdown with checklist and callout boxes

JSON Output Format:
{
  "id": "blog_2026_04_22_manual_work",
  "slug": "hidden-cost-manual-comp-processes",
  "title": "[Agent generates]",
  "excerpt": "[1-2 sentences emphasizing risk]",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-22T00:00:00Z",
  "category": "Operations",
  "featured": false,
  "readTime": 7,
  "content": "[Full markdown with checklist]",
  "tags": ["manual-work", "compliance", "risk", "operations"]
}
```

**Expected output:** ~1,200-word compliance-focused post
**Action:** Add to JSON

---

### Blog Post 4: "How to Audit Your SPM Data Quality"

**Prompt:**

```
Generate a blog post for Blue Horizons Group's marketing website.

Topic: "How to Audit Your SPM Data Quality in 6 Steps"
Platform: General (Anaplan, Varicent, NetSuite, Incent)
Gap Focus: Data Quality
Audience: Comp ops leaders, IT directors, data analysts
Goal: Self-serve diagnostic tool + assessment driver
Length: 1200-1400 words
Tone: Practical how-to guide. Step-by-step. Actionable.

Outline you MUST follow:
1. Hook (Problem: "Data issues cost you $2-5M in hidden overpayments")
2. Why Data Quality Fails (5 root causes)
3. Step-by-step Audit Process:
   Step 1: Define your data inventory (what systems feed comp)
   Step 2: Check completeness (missing records)
   Step 3: Check accuracy (duplicates, mismatches)
   Step 4: Check consistency (conflicting values across systems)
   Step 5: Check timeliness (data freshness)
   Step 6: Document findings (audit trail)
4. Expected Findings (common issues for each industry)
5. Remediation (quick wins vs. long-term fixes)
6. Prevention (how to prevent regression)
7. Next Steps (CTA: "Find your data gaps in 5 minutes" → assessment)

Specific tools/approaches to mention:
- SQL query examples (but in plain English for non-technical readers)
- Spreadsheet audit techniques
- Data validation rules to implement
- Tools: Excel COUNTIF, VLOOKUP for matching
- System-specific audits: Anaplan data import logs, Varicent job logs

Additional Instructions:
- Include a downloadable audit checklist (reference, don't embed)
- Use real examples: "A Fortune 500 tech company found 8,000 duplicate customer records"
- Make this self-serve (doesn't require SPM expertise to understand)
- Include a template for documenting findings
- CTA: "Discover what data issues you might have"
- Format: markdown with code blocks (SQL examples) and tables

JSON Output Format:
{
  "id": "blog_2026_04_25_data_quality",
  "slug": "how-to-audit-spm-data-quality",
  "title": "[Agent generates]",
  "excerpt": "[1-2 sentences about audit process]",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-25T00:00:00Z",
  "category": "Data Quality",
  "featured": false,
  "readTime": 8,
  "content": "[Full markdown with checklist references]",
  "tags": ["data-quality", "audit", "validation", "operations"]
}
```

**Expected output:** ~1,300-word how-to guide
**Action:** Add to JSON

---

### Email Sequence: "Compression Gap Nurture" (Refresh)

**Prompt:**

```
Generate email copy for a 4-email nurture sequence for Blue Horizons Group.

Sequence Type: Compression Gap Nurture (REFRESH EXISTING)
Recipient Persona: VP Sales, Finance Director, Ops Manager with 6+ week cycle
Goal: Move from "identified problem" to "ready for consultation"
Tone: Consultant (helpful, expert, not pushy)
Brand Voice: Professional but warm. Data-driven. Action-oriented.

Current sequence is functional but we want to improve:
- Subject line open rates (currently 22%, target 30%+)
- Email click-through (currently 2%, target 5%+)
- Conversion to contact form (currently 3%, target 8%+)

Email 1 - Day 0 (Immediate):
  Subject: [Refresh - make more compelling, urgency optional]
  Goal: Hook on their specific pain (8-week cycle)
  New angle: Lead with economic impact, not problem
  Example: "8-week compression costs you $X per year"
  Body: Acknowledge their pain point specifically, introduce quick fix, soft case study
  CTA: "See how [similar company] got to 3 weeks" (case study link)
  Length: 150-200 words

Email 2 - Day 3:
  Subject: [Refresh - make more curiosity-driven]
  Goal: Build credibility with data
  New angle: Share specific benchmark data (their industry if possible)
  Body: Show how other companies solved it, what worked vs. what didn't
  CTA: "Explore 5 quick wins you can implement now" (blog link)
  Length: 150-200 words

Email 3 - Day 7:
  Subject: [Refresh - educational, not promotional]
  Goal: Teach something valuable (not sales pitch)
  New angle: "What's your compression cycle really costing?"
  Body: Calculator/framework for estimating their cost, show ROI of compression
  CTA: "Calculate your compression cost" (ROI calculator link)
  Length: 150-200 words

Email 4 - Day 14:
  Subject: [Refresh - create urgency + path forward]
  Goal: Cost of delay, clear next step
  New angle: "Every week of delay costs you $X" (personalized)
  Body: Summary of journey, why now is critical, simple next step
  CTA: "Schedule optimization consultation" OR "Take 5-min assessment for specifics"
  Length: 150-200 words

Variables to include:
- {{first_name}} - Recipient
- {{company}} - Company name
- {{cycle_length}} - Current cycle (from assessment)
- {{annual_cost}} - Estimated cost of delay
- {{email}} - Unsubscribe use

Brand guidelines:
- No hype (avoid "revolutionize", "transform", "cutting-edge")
- Specific over general (cite numbers, not platitudes)
- Problem-first (show you understand their pain before offering solution)
- Multiple CTAs optional (max 2 per email)
- Each email should work standalone (recipient may skip to day 14)

Output as JSON:
{
  "id": "compression-gap-seq-v2-april",
  "name": "Compression Gap Nurture (April 2026 Refresh)",
  "description": "For leads identified with compression cycle challenges",
  "emails": [
    {
      "id": "compression_1",
      "order": 1,
      "delay": 0,
      "subject": "[Agent generates compelling subject]",
      "preheader": "[Agent generates preheader]",
      "body": "[Full email body with {{variables}}]"
    },
    // ... 3 more emails
  ]
}
```

**Expected output:** Refreshed 4-email sequence with new angles
**Action:** Replace in `public/email-templates.json` under "compression_gap" section

---

### Case Study: "Fortune 500 Tech - Compression Cycle"

**Prompt:**

```
Generate a case study for Blue Horizons Group's website.

Context:
- Client: Large technology company (10,000+ employees)
- Platform: Anaplan
- Industry: Software/Technology
- Company Size: Enterprise (10K+)
- Gap Solved: Compression Cycle (8 weeks → 3 weeks)
- Timeline: 4-month engagement
- Team involved: 3 BHG consultants, 5 client team members

Challenge (what you learned from this engagement):
- Client was stuck in 8-week compression due to: manual data validation, missing automation, untested config changes
- Impact: Lost 1-2 weeks of financial close per quarter, forecast inaccuracy $50M+
- Root cause: Anaplan implementation was "functional but not optimized" — nobody owned the comp process end-to-end
- Symptoms: Finance team complained about timing, sales leadership questioned accuracy, ops spent 80% on manual work

Solution (what BHG did):
- Methodology: Diagnosis → Root cause analysis → Design optimization → Test in sandbox → Implement → Handoff
- Key decisions: Eliminated manual validation by automating 95% of data checks, built exception workflow (only human touch on true exceptions), created data validation rules in Anaplan
- Tools/platforms: Anaplan, Excel for modeling, Git for version control
- Team: 1 lead consultant, 1 implementation specialist, 1 configuration expert

Results (quantified outcomes):
1. Compression Cycle: 8 weeks → 3 weeks = 62% reduction, 5 weeks faster close
2. Manual Work Hours: 200 hours/cycle → 40 hours/cycle = 80% reduction in labor
3. Error Rate: 12 exceptions per cycle → 2 exceptions per cycle = 83% reduction in disputes
4. Financial Impact: $500K annual savings (labor + accuracy + faster reporting), 4-month payback

Testimonial (from client):
- Quote: "[We] were skeptical we could compress without errors. BHG proved that with the right approach, you can close faster AND more accurately. The difference wasn't technology — it was having someone who understood our specific process."
- Attribution: VP Finance, [Anonymized Tech Company]

Tone: Professional, specific, humble (BHG enabled them, client did the work)
Avoid: Generic praise, undefined metrics, vendor bashing, overhyping

Output Format (JSON):
{
  "id": "cs_2026_04_enterprise_tech_compression",
  "slug": "fortune-500-tech-compression-cycle",
  "title": "[Company]: Compressed Comp Cycle from 8 Weeks to 3 Weeks",
  "platform": "Anaplan",
  "industry": "Technology",
  "companySize": "Enterprise",
  "excerpt": "[1-2 sentences, include %]",
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
    "title": "Streamlined Data Validation, Optimized Workflows, Automated Exception Handling",
    "description": "[How BHG approached it]",
    "approach": "[2-3 paragraph narrative]"
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
    "quote": "[Agent generates realistic quote]",
    "attribution": "VP Finance, [Anonymized Company]"
  },
  "nextSteps": [
    "Step 1: [Specific next action]",
    "Step 2: [Specific next action]",
    "Step 3: [Specific next action]"
  ]
}
```

**Expected output:** Complete case study with metrics, testimonial, narrative
**Action:** Add to `public/case-studies.json`

---

## May 2026 (Month 2)

**Theme:** "Platform-Specific Deep Dives"
**Goal:** Drive traffic from platform-specific searches (Varicent, NetSuite, Incent)

### Blog Posts:
1. "Varicent Designer: 7 Common Setup Mistakes We See"
2. "NetSuite Compensation Management: Configuration Best Practices"
3. "Incent Commission Rules: Avoiding Rounding and Calculation Errors"
4. "The ROI of Automating Comp Plan Changes"

### Email Sequence:
- "Manual Work Gap Nurture" (refresh with automation angle)

### Case Study:
- Mid-market distributor using Varicent (compression + manual work combo)

---

## June 2026 (Month 3)

**Theme:** "Compliance & Risk"
**Goal:** Reach compliance/audit/risk personas

### Blog Posts:
1. "SOX Compliance and Your SPM System: What Auditors Are Looking For"
2. "Preventing Comp Overpayment: A Compliance Framework"
3. "Data Privacy in Compensation Systems: GDPR & Beyond"
4. "Audit-Ready Compensation: Building an Evidence Trail"

### Email Sequence:
- "Data Quality Gap Nurture" (refresh with compliance angle)

### Case Study:
- Large financial services company fixing data quality for regulatory compliance

---

## How to Execute

**Each Week:**

Monday: Read week's section, copy prompts
Tuesday: Paste into AICR console, agent generates
Wednesday: Review output (15 min review per asset)
Thursday: Add to JSON files, commit, deploy
Friday: Monitor performance (views, clicks)

**Monthly Routine:**
- Week 1: Blog posts generated + reviewed
- Week 2: Blog posts published + email sequence starts
- Week 3: Case study generated + reviewed
- Week 4: Publish case study, plan next month, monitor metrics

---

## Prompt Library (Quick Reference)

**Blog Post:** Copy relevant month/post prompt above
**Email Refresh:** Copy sequence prompt for your target gap
**Case Study:** Copy case study prompt, customize client context
**LinkedIn Post:** Coming in next section

All prompts follow the same format:
1. Topic + context
2. Outline (required structure)
3. Specific angles to explore
4. Brand guidelines
5. JSON output format

Just copy/paste into AICR console, adjust company name/numbers as needed.

---

## Success Tracking

**Monthly Metrics to Watch:**

| Metric | April Target | May Target | June Target |
|--------|--------------|-----------|------------|
| Blog pageviews | 500 | 800 | 1200 |
| Blog → Assessment | 3% | 5% | 7% |
| Assessment completions | 100 | 150 | 200 |
| Email open rate | 25% | 28% | 30% |
| Email click rate | 3% | 4% | 5% |
| Contact form submissions | 15 | 25 | 35 |

---

## Notes for Your Team

- **Agent output quality:** First month will be slower (agent learning your voice). By month 2-3, output quality improves significantly.
- **Review time:** First review takes 20-30 min. By month 3, 10-15 min (pattern recognition).
- **Customization:** Don't ask agent for perfection. 80% good from agent → 20% polish from you is the right balance.
- **Reprompting:** If output misses mark, don't rewrite. Give agent feedback: "Make this more consultant-focused, less salesy" and regenerate.
- **Content calendar:** This is flexible. If a blog gets 10x traffic, double down. If something flops, skip the variant.

---

## Phase 5 Complete

You now have:
✓ Concrete monthly plans (April-June)
✓ Copy-paste-ready prompts for every asset
✓ JSON output formats so you know what to expect
✓ Success metrics to track each month
✓ A repeatable rhythm for your 2-person team

Just follow the prompts, review the output, add to JSON files, deploy. 

**Next month:** LinkedIn social media strategy to amplify blog traffic.
