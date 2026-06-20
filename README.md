# Electi + X360 — Standalone Projects

This repository contains four independently-deployable web applications:

| Folder | Stack | Description |
|--------|-------|-------------|
| [`electi-website/`](./electi-website/) | React + Vite | Electi AI SaaS platform |
| [`electi-admin/`](./electi-admin/) | React + Vite | Electi Admin Panel |
| [`x360-website/`](./x360-website/) | Next.js 15 | X360 Corporate Website |
| [`x360-admin/`](./x360-admin/) | Next.js 14 | X360 Admin Dashboard |

## Quick start

Each folder is fully self-contained. Pick the one you want:

```bash
cd electi-website   # or electi-admin / x360-website / x360-admin
npm install
npm run dev
```

## Deployment

Point Vercel / Netlify at this repo and set the **Root Directory** to the
folder you want to deploy. See each folder's `README.md` for detailed instructions.
