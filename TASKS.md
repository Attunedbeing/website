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
  - Was firing at 1 minute; corrected to the agreed 2 minutes
- [x] Standalone subscribe section at bottom of page (per Enhancements Statement)

## Gallery / Instagram

- [x] Gallery component — static version with placeholder images
- [x] Instagram Netlify function
  - Instagram Login route (no Facebook Page needed), Meta app ID 2045741559312901
  - Token stored in Netlify as INSTAGRAM_ACCESS_TOKEN (secret) and in local .env (gitignored)
- [~] Connect gallery to Instagram feed
  - Connected to Ellana's real account (token in Netlify + .env, generated 2026-08-14, expires ~2026-10-13)
  - Verified on draft deploy; goes live when feature/instagram-gallery merges to main

## Free extras (post-Enhancements goodwill, not billed)

- [x] Replace em-dashes with hyphens in all site copy
- [x] Instagram + Facebook links in footer
  - Instagram confirmed: instagram.com/attuned.being
- [x] Confirm Facebook page URL with Ellana (real URL now in footer)
- [x] Swap photos per Ellana's picks: hero banner (4G4A7600), bio (4G4A7340), service description (NZG 5)
  - Gallery static fallbacks unchanged (live Instagram feed supersedes them anyway)

## Maintenance

- [ ] Scheduled Netlify Function to auto-refresh Instagram access token (expires every 60 days)
  - Current token generated 2026-08-14, expires ~2026-10-13

## Upgrades (paid)

- [ ] Airtable response caching via Netlify Blobs — 24hr TTL, demand-driven refresh
  - Ready to go on branch `feature/airtable-caching`, merge when agreed
