# Electi — AI SaaS Platform

Premium cinematic AI SaaS platform for Saudi businesses, showcasing four intelligent AI agents with full bilingual EN/AR support.

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
| `VITE_API_URL` | No | Base URL for API calls (default: same origin) |

Create a `.env` file at the root of this folder if you need to override defaults.

## Deployment (Vercel / Netlify)

1. Import this repository on Vercel / Netlify
2. Set **Root Directory** to `electi-website`
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

## Contact
mohammed@electi.sa | +966 502547274
