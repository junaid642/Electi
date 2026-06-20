# X360 Admin

Internal admin dashboard for X360 — manage content, chatbot conversations, leads, and analytics.

## Tech stack
Next.js 14, React 19, Tailwind CSS 4, Framer Motion, TypeScript

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No | API base URL |
| `NEXTAUTH_SECRET` | Recommended for prod | NextAuth session secret |

## Deployment (Vercel)

1. Import this repository on Vercel
2. Set **Root Directory** to `x360-admin`
3. Framework auto-detected as **Next.js**
4. Add any required environment variables in the Vercel dashboard
