# Electi Admin Panel

Internal admin dashboard for the Electi AI SaaS platform — manage projects, CRM, jobs, blog posts, analytics, and more.

## Tech stack
React 18 + Vite 7, Framer Motion, Tailwind CSS 4, Wouter, TypeScript

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | API server base URL |

## Deployment (Vercel / Netlify)

1. Import this repository on Vercel / Netlify
2. Set **Root Directory** to `electi-admin`
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
