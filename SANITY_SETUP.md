# Sanity CMS Setup for BHG Website

## Quick Start

### 1. Create a Sanity Project

Visit https://www.sanity.io and create a new project:
- **Project Name:** BHG Website
- **Dataset:** production
- **Workspace:** Use default settings

### 2. Get Your Project Credentials

After creating your project:
1. Go to Settings → API → Tokens
2. Generate an API token with these permissions:
   - `documents:read` (for fetching content)
   - `documents:write` (for creating/editing content)
3. Copy the token and save it securely

### 3. Configure Environment Variables

Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
```

### 4. Create Sample Data (Optional)

You can seed your Sanity project with initial content by visiting the Sanity Studio and manually creating documents, or you can write a migration script.

### 5. Run Sanity Studio

Start the development server and visit Sanity Studio:

```bash
npm run dev
```

Sanity Studio will be available at: `http://localhost:3000/studio`

## Content Models

### Homepage Document
The homepage document contains:
- **Hero Section:** Main heading, subheading, CTA text
- **Stats:** Achievement numbers and labels
- Edit at: http://localhost:3000/studio

### Testimonials
Create multiple testimonial documents with:
- Quote text
- Author name
- Author title/company
- Author photo (optional)
- Featured toggle (to show on homepage)

### Services
Create service documents describing:
- Service title
- Description
- Key details/bullet points
- Icon name
- Display order

### Pillars
Create pillar documents for:
- Pillar title
- Description
- Icon type (BarChart3, Target, Users)
- Color (red or blue)
- Display order

### Proof Points
Create proof point statistics:
- Stat number (e.g., "300+")
- Description
- Section (industryStats or ourNumbers)
- Display order

## Editing Content

### Access Sanity Studio

1. Visit `http://localhost:3000/studio` while dev server is running
2. Log in with your Sanity account
3. Navigate to different content types in the left sidebar
4. Create and edit documents
5. Click "Publish" to make changes live

### Publishing Changes

All changes published in Sanity Studio are immediately available on the website.

## Deploying to Production

When you deploy the website to Vercel:

1. Add environment variables to Vercel project:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

2. The production site will automatically fetch content from Sanity

## Troubleshooting

### "No project ID specified"
Make sure `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID` set.

### Changes not showing on website
Try reloading the page. The website fetches content from Sanity on page load.

### Can't access Sanity Studio
Make sure the dev server is running with `npm run dev` and visit `http://localhost:3000/studio`

## Next Steps

1. Create your Sanity project
2. Update `.env.local` with your credentials
3. Visit Sanity Studio and start creating content
4. Test by viewing the homepage and other pages
5. When ready, deploy to Vercel

For more help, visit: https://www.sanity.io/docs
