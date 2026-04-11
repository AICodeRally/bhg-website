# BHG Website Admin Guide

## Access Admin Dashboard

1. **Go to:** http://localhost:3000/admin/login
2. **Password:** `bhg-admin-2024` (change in .env if needed)
3. **You'll be redirected to:** http://localhost:3000/admin

## What You Can Edit

The admin dashboard lets you edit all the main website copy:

- **Hero Section:** Badge, heading, subheading, description, buttons
- **Bottom CTA:** The final call-to-action section

All other content is hardcoded (testimonials, services, pillars) but can be made editable. Just ask!

## Making Changes

1. Login to admin dashboard
2. Edit any text field
3. Click **"Save Changes"** button
4. Changes appear on the website **immediately**
5. Click **"Logout"** when done

## How It Works

- Content stored in: `public/content.json`
- Admin interface loads the JSON file
- Changes are saved back to the file
- Homepage reads from JSON on page load
- No database needed, no external services

## Changing the Password

Edit `.env.local`:
```env
ADMIN_PASSWORD=your_new_password
```

Then restart the dev server.

## For Vercel Deployment

Add this environment variable to your Vercel project settings:
```
ADMIN_PASSWORD=your_secure_password
```

The admin interface will work the same way on Vercel.

## Adding More Editable Sections

Want to add more sections to the admin dashboard? Tell me which ones and I'll wire them up:
- Testimonials
- Services descriptions
- Stats
- Any other section

---

**Website:** http://localhost:3000
**Admin:** http://localhost:3000/admin/login
**Default Password:** bhg-admin-2024
