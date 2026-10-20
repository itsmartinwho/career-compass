# career-compass

Turns a brain dump and a CV into a career diagnosis and three paths forward.

![The welcome screen](docs/screenshot.jpg)

You write down what is going wrong at work, optionally add a CV, and get back a plain-language diagnosis and three paths, each with a roadmap of concrete steps. The app calls itself Unstuck. JJ built it in December 2025 with [Lovable](https://lovable.dev), which keeps this repo's `main` branch in sync. There is no hosted copy, so you run it yourself.

## What it does

Seven screens, in order:

1. **Welcome.** What to expect.
2. **Brain dump.** A free-text box. It wants at least 50 characters.
3. **Context.** Optional. A CV as a PDF or plain text file (up to 5 MB) and a LinkedIn profile URL.
4. **Processing.** Reads the CV in the browser and sends the text to the edge function.
5. **Diagnosis.** A short summary in a validating tone, and a handful of named issues such as burnout or a role mismatch. Each has a one-sentence description and an intensity from one to three.
6. **Paths.** Three distinct paths, for example stay and fix, pivot, or break. Each has a time horizon, a risk level, an energy level (low, medium or high) and its first moves.
7. **Path detail.** Why the path fits, steps to take tonight, and a roadmap in phases. Every step says why it matters and how to do it. Some add the kind of people to talk to, a LinkedIn search query and a draft outreach message, with a copy button on the last two. Steps can be ticked off on the page.

The prompt asks for three paths and the code shows whatever comes back. The LinkedIn URL goes to the model as text. Nothing fetches the profile.

## How it works

The browser never talks to Gemini. `src/lib/gemini.ts` calls one Supabase Edge Function, `analyze-career-path`, with the brain dump, the CV text and the URL. The function builds one prompt and calls Gemini's `generateContent` with a key held as a server-side secret. It asks for JSON only, strips any code fence, parses the result and returns it. The page checks that `careerPaths` is an array and otherwise goes back to the brain dump with an error.

The function uses `gemini-4-argon`, Google's most capable model. It has no free tier, so the key needs billing (as of October 2026: $2 per million input tokens and $10 per million output, doubling on 1 December). Google retires models often, so the `GEMINI_MODEL` secret overrides it without a code change, for example with `gemini-3.8-flash`, which runs on the free tier; the [current list](https://ai.google.dev/gemini-api/docs/models) is on Google's site. It forwards at most 20,000 characters of brain dump and 40,000 of CV text.

## Privacy

A CV is personal data. This is what the code does with one, as far as it shows:

- **Stored:** nothing. There are no Supabase tables and no migrations; Supabase only hosts the function. The answers and the result live in the page's memory and are gone when you reload or close the tab. The app writes nothing to localStorage, sessionStorage or cookies.
- **Sent:** the brain dump, the extracted CV text and the LinkedIn URL go from the browser to your Supabase function, then to Google's Gemini API. The CV file itself stays in the browser, where pdf.js extracts its text. The pdf.js worker loads from cdnjs.cloudflare.com.
- **Logged:** the function logs errors only (Gemini's error message), not the request. Supabase's own platform logs still record that it was called.
- **Google:** it processes the text. As of October 2026 its pricing page says the free tier of the Gemini API uses content to improve its products and the paid tier does not. The default model is paid-only, so that holds unless you switch to a free-tier model; if you do, don't let anyone paste a real CV.
- **How long:** the app keeps nothing, so nothing expires. How long Google and Supabase keep their own logs is set by their terms, not by this code.

## Costs and abuse

The Supabase anon key is public by design: it is in the browser bundle, and the function accepts any call that carries it. Anyone who finds a deployment can run analyses on your Gemini quota. The function caps input size and does nothing else. Put a quota or spending cap on the Gemini key, and add a rate limit before you share the URL widely.

## Run it

You need Node 18 or later, a Supabase project and a Gemini API key.

```
git clone https://github.com/itsmartinwho/career-compass.git
cd career-compass
npm install
cp .env.example .env
npm run dev
```

Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` first (Supabase, Project Settings, API). The app is at `http://localhost:8080`. Without them every screen still renders, and the analysis stops with a message that says to fill in `.env`.

`npm run build` makes a production build in `dist/`, and `npm run lint` runs ESLint.

### Supabase setup

There is no schema to create. You only deploy the function and give it the key. With the [Supabase CLI](https://supabase.com/docs/guides/cli):

```
supabase login
supabase link --project-ref your-project-ref
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
supabase functions deploy analyze-career-path
```

- `GEMINI_API_KEY` is required. Get one in [Google AI Studio](https://aistudio.google.com/apikey).
- `GEMINI_MODEL` is optional and defaults to `gemini-4-argon`: `supabase secrets set GEMINI_MODEL=...`
- Keep the platform's JWT check on (the default). The client sends the project's anon key, which passes it.

## Project structure

```
src/pages/        one file per screen: Welcome, BrainDump, Context, Processing, Diagnosis, Paths, PathDetail
src/context/      SessionContext: the answers and the result, in memory
src/lib/          gemini.ts calls the function, pdf-utils.ts reads a PDF, supabase.ts is the client
src/components/   GlassCard and ProgressIndicator, plus shadcn/ui in ui/
supabase/functions/analyze-career-path/   the edge function: the prompt and the Gemini call
```

Vite, React 18, TypeScript, Tailwind and shadcn/ui, React Router, pdf.js, Supabase Edge Functions and the Gemini API.

## Licence

MIT, see [LICENSE](LICENSE).

By José (JJ) Martín Quesada, [@itsmartinwho](https://github.com/itsmartinwho).
