# CivicBridge

CivicBridge is a conversational web app for helping rural and semi-urban Indian citizens discover welfare schemes, understand eligibility, and ask follow-up questions in their preferred language.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS + local shadcn-style UI primitives
- Supabase PostgreSQL integration for saved profiles and future tracking
- Gemini Flash for multilingual chat, with a local safe fallback when no API key is configured
- Static JSON scheme database for hackathon reliability

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill:

- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The app still works in demo mode without these keys: matching and scheme search are local, and chat streams a grounded fallback answer from the scheme database.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor. The API will save intake profiles only when the Supabase URL and service role key are present.

## Demo Profiles

- Farmer: age 52, Karnataka, farmer, income below Rs. 50,000, below 2 acres
- Student: age 22, Rajasthan, student, income below Rs. 1 lakh
- Construction worker: age 38, Maharashtra, construction worker, income below Rs. 1 lakh
