# X360 — Corporate Website

Cinematic corporate website for X360, a Saudi AI-driven real-estate and VR company.

## Tech stack
Next.js 15, React 19, Tailwind CSS 4, Framer Motion, GSAP, TypeScript

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Environment variables

No required environment variables for basic operation. Add a `.env.local` file if needed:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No | API base URL |

## Deployment (Vercel)

1. Import this repository on Vercel
2. Set **Root Directory** to `x360-website`
3. Framework auto-detected as **Next.js**
4. No additional config needed — Vercel handles it automatically

## Deployment (Netlify)

```toml
# netlify.toml
[build]
  base    = "x360-website"
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```
