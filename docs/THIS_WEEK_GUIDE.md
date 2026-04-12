# This Week — BHG Content Execution Guide

**Bookmark this. Use it every Monday morning.**

---

## Monday: Plan This Week

**Reading time: 15 min**

1. Open `docs/MONTHLY_CONTENT_PLAYBOOK.md`
2. Find your current month (April/May/June)
3. Identify this week's assets:
   - **Week 1:** Blog post #1
   - **Week 2:** Blog post #2
   - **Week 3:** Blog post #3
   - **Week 4:** Blog post #4 + Email refresh
4. Copy the prompts you need (Ctrl+C)
5. Paste them into a drafts document (one doc per asset)
6. Note which JSON file each goes into:
   - Blog posts → `public/blog-posts.json`
   - Emails → `public/email-templates.json`
   - Case studies → `public/case-studies.json`

---

## Tuesday: Generate Content

**Active time: 30 min (mostly waiting for agent)**

**For each asset (Blog/Email/Case Study):**

1. Open AICR agent console
2. Paste the prompt
3. Agent generates content (takes 2-5 min)
4. Copy the JSON output into a text file
5. Store in folder: `Generated Content This Week/`

**Pro tips:**
- Generate all 4 blogs in parallel (open 4 console windows)
- While waiting, prepare your review notes
- Save agent output AS-IS (don't edit yet)

---

## Wednesday: Review & Approve

**Review time: 15 min per asset (60 min total for 4 blogs)**

**For each blog post:**

1. Read the full blog (5 min)
2. Check:
   - ✓ Hook grabs attention
   - ✓ Metrics are cited/realistic
   - ✓ BHG mention is subtle (1-2 sentences max)
   - ✓ CTA is clear
   - ✓ No vendor lock-in messaging
   - ✓ Tone is consultative, not salesy
3. Mark as:
   - ✓ **APPROVE** → Add to JSON
   - ⚠ **REVISE** → Give specific feedback, regenerate
   - ✗ **REJECT** → Start over with different angle

**For each email:**

1. Read all 4 emails (5 min)
2. Check:
   - ✓ Subject lines are compelling (would you open?)
   - ✓ Each email stands alone
   - ✓ {{variables}} are correct
   - ✓ CTAs make sense (don't repeat same CTA all 4 emails)
   - ✓ No hype language ("revolutionize", "transform")
3. Mark as APPROVE/REVISE/REJECT

**For each case study:**

1. Read full case study (5 min)
2. Check:
   - ✓ Metrics are specific and believable
   - ✓ Challenge is real (not exaggerated)
   - ✓ BHG role is accurate (consultant, not savior)
   - ✓ Testimonial sounds authentic
   - ✓ Numbers add up (ROI calculation is correct)
3. Mark as APPROVE/REVISE/REJECT

**If REVISE:**
- Write specific feedback (max 2 sentences)
- Example: "Make the subject lines less urgency-driven. These are finance leaders who prefer data over pressure."
- Paste into agent console with: "Here's feedback on what to improve: [feedback]"
- Regenerate and review again

---

## Thursday: Publish & Deploy

**Publishing time: 20 min**

**Step 1: Add to JSON file**

```bash
# Open in your editor
code public/blog-posts.json
# or
code public/email-templates.json
# or
code public/case-studies.json
```

For **blogs**: Find the array, add your new post object, make sure JSON is valid (use JSONLint.com if unsure)

For **emails**: Find the sequence ID, replace the 4 email objects

For **case studies**: Find the array, add new case study object

**Step 2: Test locally**

```bash
# Check your site still loads
npm run dev
# Visit http://localhost:3000/blog
# Verify your new blog appears in list
```

**Step 3: Commit & Deploy**

```bash
cd /Users/toddlebaron/Development/bhg-website
git add public/blog-posts.json  # (or whichever file you edited)
git commit -m "content: add [blog-slug] blog post"
git push
# Vercel auto-deploys in ~3 min
```

**Step 4: Verify**

- Visit https://bhg.com/blog/[your-new-slug]
- Verify it displays correctly
- Check: formatting is clean, images work (if any), links work

---

## Friday: Monitor & Plan Next Week

**Monitoring time: 20 min**

**Performance Check:**

1. Open Google Analytics
2. Check metrics from **last week's** publish:
   - Page views (goal: >100 per blog in first week)
   - Click-through to assessment (goal: >3%)
   - Avg time on page (goal: >2 min)
3. Open email service analytics:
   - Open rate (goal: >25%)
   - Click rate (goal: >3%)
   - Which CTAs get clicked most? (informs next refresh)
4. Open your CRM/dashboard:
   - New contacts from assessments (goal: >10/week)
   - Assessment starts (goal: >50/week)

**Document findings:**
- Take a screenshot of key metrics
- Note what worked (blog topics, email CTAs, case study angles)
- Note what flopped (low CTR, high unsubscribe, etc.)

**Plan next week:**
- Open MONTHLY_CONTENT_PLAYBOOK.md
- Find next week's assets
- Copy prompts
- Plan review schedule for Wednesday

---

## Templates to Keep Handy

### Blog Post JSON Template

```json
{
  "id": "blog_2026_04_15_topic",
  "slug": "your-blog-slug",
  "title": "Your Blog Title",
  "excerpt": "1-2 sentence excerpt",
  "author": "AICR Content Agent",
  "publishedAt": "2026-04-15T00:00:00Z",
  "category": "Category Name",
  "featured": false,
  "readTime": 7,
  "content": "# Full markdown content here...",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Email JSON Template

```json
{
  "id": "sequence_id",
  "name": "Sequence Name",
  "emails": [
    {
      "id": "seq_1",
      "order": 1,
      "delay": 0,
      "subject": "Subject line",
      "preheader": "Preheader text",
      "template": "template_id"
    }
    // ... 3 more emails
  ]
}
```

### Case Study JSON Template

```json
{
  "id": "cs_2026_04_topic",
  "slug": "company-name-outcome",
  "title": "Company Name: Outcome",
  "platform": "Platform",
  "industry": "Industry",
  "companySize": "Enterprise|Mid-market|SMB",
  "excerpt": "1-2 sentence excerpt",
  "challenge": {
    "title": "Challenge title",
    "description": "1-2 sentences",
    "bullets": ["point1", "point2", "point3"]
  },
  "solution": {
    "title": "Solution title",
    "description": "Overview",
    "approach": "Narrative"
  },
  "results": [
    {
      "metric": "Name",
      "before": "Before value",
      "after": "After value",
      "impact": "% improvement or $ savings"
    }
  ],
  "roi": {
    "annualSavings": 500000,
    "breakdown": ["Item 1", "Item 2"],
    "paybackPeriod": "X months"
  },
  "testimonial": {
    "quote": "Client quote",
    "attribution": "Name, Title, Company"
  },
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}
```

---

## Quick Troubleshooting

**"Agent output isn't what I expected"**
→ Give specific feedback: "Make this less salesy and more consultant-like"
→ Regenerate and review again

**"Blog isn't showing up on /blog after deploy"**
→ Check: Did you add it to the array in blog-posts.json? (look for [ { } ] structure)
→ Check: Is JSON valid? (no missing commas, quotes)
→ Run `npm run typecheck` locally to catch errors
→ Clear browser cache (Ctrl+Shift+Del)

**"Email metrics are low (low opens/clicks)"**
→ Try different subject line angle next time
→ Check: Are people even in the email list? (verify enrollment logic in your backend)
→ Check: Is email going to spam? (check sender reputation)

**"CTA isn't converting"**
→ Try a different link destination (blog → case study, case study → assessment, etc.)
→ Try different button text: "See how we fixed this" vs "Schedule a call" vs "Get the checklist"

**"I can't find where to edit JSON"**
→ Use VS Code or your editor
→ Open `public/[filename].json`
→ Look for the array [ ] containing objects { }
→ Add your new object before the closing ]

---

## Success Indicators (This Week)

By end of week:

✓ 1-4 blog posts published
✓ 1 email sequence refreshed
✓ 1 case study published (if week 4)
✓ All files committed to git
✓ Vercel deployment successful
✓ New content appears on live site
✓ Metrics tracked in spreadsheet

---

## Reference Links

- Monthly playbook: `docs/MONTHLY_CONTENT_PLAYBOOK.md`
- Blog posts: https://bhg.com/blog
- Email templates: `public/email-templates.json`
- Case studies: https://bhg.com/case-studies
- Analytics: Google Analytics dashboard
- Email service: Mailchimp/SendGrid dashboard

---

**Questions?** See `docs/MARKETING_SYSTEM_OVERVIEW.md` for deep context.

**Ready to publish next week?** Just follow the 5 steps above.

**Bookmark this page.** Use it every Monday.
