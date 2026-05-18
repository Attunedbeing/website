# Attuned Being — Website

A React + TypeScript + Vite website for Attuned Being, a wellness/therapy services business. Deployed via Netlify.

## Dev Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173
npm run build     # production build
```

## Component Map

| File | Purpose |
|---|---|
| `components/Hero.tsx` | Top banner / hero section |
| `components/Services.tsx` | Services list |
| `components/Pricing.tsx` | Pricing tiers |
| `components/About.tsx` | About / bio section |
| `components/Contact.tsx` | Contact form |
| `components/FAQ.tsx` | FAQ section |
| `components/Navbar.tsx` | Navigation bar |
| `components/Footer.tsx` | Footer |
| `components/Testimonials.tsx` | Client testimonials |
| `components/Overview.tsx` | Overview/intro section |
| `components/Ritual.tsx` | Ritual section |
| `components/AgeVerification.tsx` | Age verification gate |

Entry point: `index.tsx`

## Task Tracking

Open tasks are tracked in `TASKS.md` at the project root. Check and update it as work is completed. Statuses: `[ ]` not started, `[x]` done, `[-]` blocked, `[~]` in progress.

## Meeting Analysis Workflow

When the user asks you to analyse a meeting recording (any audio file: `.m4a`, `.mp3`, `.wav`, etc.), follow this workflow:

### Step 1 — Transcribe

Run the transcription script against the audio file:

```bash
python scripts/transcribe_meeting.py "<path-to-audio-file>"
```

This uses OpenAI Whisper (`base` model by default). It will:
- Download the model on first run (one-time, ~150 MB)
- Save a `_transcript.txt` file next to the audio
- Print the path to the transcript

If the audio is long or accuracy is important, use `--model small` or `--model medium`.

### Step 2 — Read the transcript

Read the `_transcript.txt` file that was just created.

### Step 3 — Extract design instructions

Analyse the transcript and produce a structured report with these sections:

**Design / Content Changes**
- List any requested changes to the website (copy, layout, colours, images, sections)

**Action Items**
- Concrete tasks, with the relevant component file where applicable (e.g. `components/Hero.tsx`)

**Decisions / Context**
- Any decisions made or context that affects the website that doesn't map to a specific change

**Unclear / Needs Clarification**
- Anything mentioned that was ambiguous or needs follow-up

Then ask the user which items to implement, or proceed if they say to go ahead.

### Prerequisites

Whisper must be installed:

```bash
pip install openai-whisper
```

ffmpeg must also be on the PATH for Whisper to read `.m4a` files. Install via:
- Windows: `winget install ffmpeg` or download from https://ffmpeg.org/download.html
- Then restart the terminal so PATH updates take effect.
