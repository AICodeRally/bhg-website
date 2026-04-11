# BHG Website - Sanity CMS Integration Guide

## Overview

The BHG website now uses **Sanity.io**, a headless CMS that allows the marketing team to edit website content without touching code. All content is managed through an intuitive admin interface.

## Color Scheme

The website now uses **Texas A&M Aggie colors**:
- **Maroon:** #500000, #8B1538 (primary brand color)
- **Gold:** #FFB82C (accent color)
- **Dark backgrounds** with glass morphism effects

## Quick Setup (First Time Only)

### Step 1: Create Sanity Project
1. Visit https://www.sanity.io
2. Sign up or log in
3. Create a new project:
   - Name: "BHG Website"
   - Dataset: "production"
4. Copy your **Project ID** from Settings

### Step 2: Create API Token
1. In Sanity, go to Settings → API → Tokens
2. Create a new token with these permissions:
   - `documents:read`
   - `documents:write`
3. Copy the token and save it

### Step 3: Configure Environment
Create `.env.local` with:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here
```

### Step 4: Start Development Server
```bash
npm install
npm run dev
```

Access Sanity Studio at: **http://localhost:3000/studio**

## Managing Content

### Available Content Types

1. **Homepage** - Main page configuration
   - Hero section text and CTA
   - Statistics
   - All hero section messaging

2. **Testimonials** - Client quotes
   - Quote text
   - Author name and title
   - Author photo
   - Toggle featured status

3. **Services** - Service offerings
   - Service title and description
   - Details/bullet points
   - Icon type
   - Display order

4. **Pillars** - SPM Foundation pillars
   - Title and description
   - Icon and color
   - Display order

5. **Proof Points** - Statistics
   - Stat number and description
   - Section assignment
   - Display order

### Adding New Content

1. Open Sanity Studio: http://localhost:3000/studio
2. Select a document type from the left sidebar
3. Click "Create" to add new content
4. Fill in the fields
5. Click "Publish" to make it live

### Editing Existing Content

1. In Sanity Studio, find the document you want to edit
2. Update the fields
3. Click "Publish" to save changes
4. Changes appear on the website immediately

## Development Commands

```bash
npm run dev           # Start dev server + Sanity Studio
npm run build         # Build for production
npm run typecheck     # Check TypeScript types
npm run lint          # Run linting
```

## Deploying to Production

### On Vercel

1. Push your code to GitHub
2. Go to Vercel project settings
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Deploy - Vercel will automatically build and deploy

### Sanity Studio in Production

The Sanity Studio is accessible at `/studio` on any deployment:
- **Development:** http://localhost:3000/studio
- **Production:** https://your-domain.com/studio

## Design System

### Colors
- **Primary (Maroon):** Used for buttons, accents, and highlights
- **Secondary (Gold):** Used for gradient effects and highlights
- **Background:** Dark gradient (almost black)
- **Text:** White/off-white with opacity for hierarchy

### Typography
- **Font:** Geist (modern, clean, professional)
- **Headings:** Bold, large with letter-spacing
- **Body:** Regular weight, white/60% opacity

### Components
- **Buttons:** Rounded with gradient background, hover animations
- **Cards:** Glass morphism effect (semi-transparent with backdrop blur)
- **Sections:** Full width with consistent spacing
- **Icons:** From lucide-react library

## Updating Pages

When you add new content in Sanity, you may need to update the React pages to use that content. Here's how:

### Example: Using Testimonials

```tsx
import { client } from '@/lib/sanity'

export default async function Page() {
  const testimonials = await client.fetch(`
    *[_type == "testimonial" && featured == true]
  `)
  
  return (
    <div>
      {testimonials.map((testimonial) => (
        <div key={testimonial._id}>
          <p>{testimonial.quote}</p>
          <p>{testimonial.author}</p>
        </div>
      ))}
    </div>
  )
}
```

## FAQ

### How do I change text on the homepage?
1. Open Sanity Studio: http://localhost:3000/studio
2. Find "Homepage" document
3. Edit the hero section fields
4. Publish changes

### How do I add a new testimonial?
1. In Sanity Studio, click "Create" → "Testimonial"
2. Fill in quote, author, title, photo
3. Toggle "Featured" on if you want it on homepage
4. Publish

### How do I update colors?
Colors are defined in `app/globals.css`. Changes require code deployment:
1. Edit the CSS variables for maroon and gold
2. Test locally with `npm run dev`
3. Commit and push to GitHub
4. Vercel will auto-deploy

### Can I preview content before publishing?
Sanity has a preview feature, but for this site we recommend publishing only when ready, as all published content appears immediately on the website.

### How do I add a new page?
1. Create a new folder in `app/(public)/` (e.g., `app/(public)/new-page/`)
2. Add `page.tsx` file
3. Use the pattern from existing pages
4. Update Navigation.tsx to link to the new page

## Security Notes

- Keep your `.env.local` file private (it's in .gitignore)
- Sanity API tokens are sensitive - never commit them
- Only share `.env.example` with the team
- Each developer needs their own credentials

## Support & Resources

- **Sanity Docs:** https://www.sanity.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Lucide Icons:** https://lucide.dev

## File Structure

```
bhg-website/
├── app/
│   ├── (public)/          # Public pages
│   ├── globals.css        # Global styles (colors here!)
│   └── layout.tsx
├── components/            # React components
├── lib/
│   └── sanity.ts         # Sanity client
├── public/               # Static files
├── sanity/
│   └── schemas/          # Content schemas
├── sanity.config.ts      # Sanity configuration
├── .env.local            # Your credentials (git ignored)
├── .env.example          # Template for credentials
└── package.json
```

---

**Website:** www.bluehorizonsgroup.com
**Sanity Studio:** /studio (on any domain/environment)
