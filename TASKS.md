# Tasks

## How to use this file

- `[ ]` — not started
- `[x]` — done
- `[-]` — blocked (add a note explaining what's needed)
- `[~]` — in progress

Add a task by copying any existing line and changing the description.
Add a note on the line below a task if it needs context (indent with two spaces).

Claude will read this file and update it as work is completed. You can also edit it directly in any text editor.

---

## Subscription feature

- [x] Subscribe Netlify function + Airtable Subscribers table
- [x] Checkbox on contact form (pre-ticked, opt-out)
- [x] Pop-up after 2 minutes (dismisses permanently via localStorage)

## Gallery / Instagram

- [x] Gallery component — static version with placeholder images
- [x] Instagram Netlify function
  - Instagram Login route (no Facebook Page needed), Meta app ID 2045741559312901
  - Token stored in Netlify as INSTAGRAM_ACCESS_TOKEN (secret) and in local .env (gitignored)
- [~] Connect gallery to Instagram feed
  - Working end-to-end locally via netlify dev; goes live on next deploy (commit + push needed)

## Maintenance

- [ ] Scheduled Netlify Function to auto-refresh Instagram access token (expires every 60 days)
  - Current token generated 2026-08-14, expires ~2026-10-13

## Upgrades (paid)

- [ ] Airtable response caching via Netlify Blobs — 24hr TTL, demand-driven refresh
  - Ready to go on branch `feature/airtable-caching`, merge when agreed
