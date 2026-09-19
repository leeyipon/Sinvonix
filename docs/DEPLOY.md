# Deploying Sinvonix to Vercel

This app is a Next.js 16 site with a Prisma-backed API (contact/lead forms,
booking scheduler, job applications, admin CRM). Production runs on **Vercel**
with a **PostgreSQL** database (Neon / Vercel Postgres).

> **Why not SQLite?** The app originally used a local SQLite file. Vercel's
> serverless filesystem is ephemeral and read-only, so file-based SQLite loses
> every write between requests. Production therefore uses Postgres via Prisma's
> `@prisma/adapter-pg` driver adapter (`src/lib/db.ts`).

## 1. Create the database

Use **Neon** (or Vercel Postgres, which is Neon under the hood):

1. Create a Postgres database.
2. Copy two connection strings:
   - **Pooled** connection (host contains `-pooler`) → `DATABASE_URL`
   - **Direct** connection (no `-pooler`) → `DIRECT_URL`

## 2. Import the GitHub repo into Vercel

1. Go to <https://vercel.com/new> (under your team
   `leeyipon02-9041s-projects`).
2. **Import Git Repository** → pick `leeyipon/Sinvonix`. Authorize the Vercel
   GitHub app for the repo if prompted.
3. Framework preset is auto-detected as **Next.js**. Leave the build settings
   as-is — `vercel.json` already sets the build command to
   `prisma migrate deploy && next build`, which applies migrations before the
   Next.js build.
4. Choose the production branch you want Vercel to deploy (usually `main`).

## 3. Set environment variables

In **Project → Settings → Environment Variables**, add (for the
Production environment, and Preview/Development if you want branch deploys):

| Name                | Required | Value                                            |
| ------------------- | -------- | ------------------------------------------------ |
| `DATABASE_URL`      | yes      | Pooled Postgres URL (`-pooler`, `?sslmode=require`) |
| `DIRECT_URL`        | yes      | Direct Postgres URL (used by migrations)         |
| `RESEND_API_KEY`    | no       | Resend API key for email notifications           |
| `LEAD_NOTIFY_EMAIL` | no       | Address that receives lead/booking emails        |
| `TELEGRAM_BOT_TOKEN`| no       | Telegram bot token for alerts                    |
| `TELEGRAM_CHAT_ID`  | no       | Telegram chat id for alerts                      |

See `.env.example` for the full list.

## 4. Deploy

Click **Deploy**. On each deploy Vercel will:

1. `npm install` → `postinstall` runs `prisma generate`.
2. `prisma migrate deploy` applies pending migrations to the database.
3. `next build` builds the site.

## 5. (Optional) Seed demo CRM data

The admin dashboard shows demo leads/deals/activities/tasks. To populate them
once against your production database, run locally with the production
`DATABASE_URL` exported:

```bash
DATABASE_URL="<your pooled url>" node prisma/seed.js
```

## Local development

```bash
cp .env.example .env.local   # fill in a Postgres DATABASE_URL / DIRECT_URL
npm install
npx prisma migrate deploy    # or `prisma migrate dev` to create new migrations
npm run dev
```
