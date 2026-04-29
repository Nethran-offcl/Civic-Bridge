# CivicBridge

CivicBridge is a welfare-scheme discovery and guidance app for Indian citizens. It helps users answer three core questions quickly:

1. Which schemes may I be eligible for?
2. What documents and steps do I need?
3. How do I ask follow-up questions about one specific scheme?

The app combines an intake flow, a ranked results page, scheme detail pages, and an AI chat assistant. When a user opens Ask AI from a scheme card or scheme detail page, the assistant starts with that scheme’s summary and keeps the conversation focused on that scheme. If the user opens chat directly, it behaves as a general scheme assistant.

## Project Description

CivicBridge is designed to make government scheme discovery more understandable and less intimidating. The current app includes:

- A landing page that introduces the product and routes users into the intake flow.
- A five-step intake form that captures profile details such as age, state, occupation, income, and optional attributes.
- A results page that shows matched schemes and lets users filter them.
- Individual scheme pages with eligibility notes, benefits, documents, and application steps.
- An AI assistant that answers scheme-specific and general scheme questions.

The scheme catalog is stored locally in JSON files so the app can run reliably even without external services.

## Setup

### Prerequisites

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the app at http://localhost:3000.

### Optional environment variables

Copy `.env.example` to `.env.local` and set the values you need:

- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The app still works in demo mode without these values. Matching and scheme browsing stay local, and the chat assistant falls back to grounded responses from the local scheme data when Gemini is unavailable.

### Optional database setup

If you want profile saving through Supabase, run `supabase/schema.sql` in the Supabase SQL editor first.

### Optional data scripts

The project includes scripts for working with scheme data:

```bash
npm run seed
npm run embeddings
```

## Demo Instructions

Use this flow to demo the app end to end:

1. Open the home page and click `Find my schemes`.
2. Complete the intake form with a realistic profile.
3. Review the matched schemes on the results page.
4. Open a scheme card or scheme detail page.
5. Click `Ask AI` on that scheme.
6. Ask follow-up questions about the same scheme, such as eligibility, documents, or how to apply.

Useful demo examples:

- Karnataka woman head of household: opens schemes such as Karnataka Gruha Lakshmi.
- Farmer in Karnataka: shows agriculture-focused schemes and application guidance.
- Student profile: shows education and scholarship-related results.

If you open chat directly from `/chat` without a scheme selected, the assistant behaves as a general welfare-scheme helper.

## Tech Stack

- Next.js 16 App Router
- React 18
- TypeScript
- Tailwind CSS
- Zustand for client state
- Supabase for optional persistence
- Google Gemini for AI chat and streaming responses
- Lucide React for icons
- Framer Motion for motion effects
- React Hook Form and Zod for form handling and validation

## Features

- Intake-based scheme matching
- Ranked eligibility results
- Scheme detail pages with benefits, documents, and application steps
- Downloadable PDF application packets for offline use (with translated text)
- Scheme-aware AI chat from `Ask AI`
- General AI chat when no scheme is selected
- Local fallback responses when external AI is unavailable
- Multilingual support (seamlessly supporting major Indian languages via translation)
- Over 70+ central and state schemes supported locally

## Notes

- Scheme data lives in `data/schemes`.
- The app uses local JSON data for deterministic matching.
- The AI assistant is grounded in retrieved scheme context and does not invent schemes.
