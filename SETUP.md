# BHG Website Setup

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Type check:**
   ```bash
   npm run typecheck
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Deployment to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial BHG website commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Set build command: `npm run build`
   - Set install command: `npm install`
   - Deploy

3. **Configure custom domain:**
   - In Vercel project settings, add custom domain: `www.bluehorizonsgroup.com`

## Project Structure

- `app/` - Next.js 16 app directory
  - `(public)/` - Public-facing pages
    - `page.tsx` - Homepage
    - `why-bhg/page.tsx` - Why BHG page
    - `solutions/page.tsx` - Solutions page
    - `industries/page.tsx` - Industries page
    - `our-approach/page.tsx` - Our Approach page
    - `insights/page.tsx` - Insights & Resources
    - `contact/page.tsx` - Contact page
- `components/` - Reusable React components
  - `Navigation.tsx` - Main navigation bar
  - `Footer.tsx` - Footer component
- `lib/` - Utility functions and helpers
- `public/` - Static assets

## Colors

- **Primary Blue:** #003366 (`bhg-blue`)
- **Accent Red:** #CC0000 (`bhg-red`)
- **Light Gray:** #F5F5F5 (`bhg-light`)

## Pages to Complete

- [ ] Solutions page with detailed offerings
- [ ] Industries page with industry-specific content
- [ ] Our Approach page with methodology details
- [ ] Insights/Blog page with content
- [ ] Contact form implementation
- [ ] Case studies and success stories

## Future Enhancements

- Blog/insights content management
- Lead capture form with email integration
- Analytics integration
- SEO optimization (meta tags, structured data)
