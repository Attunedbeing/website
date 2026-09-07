// Serves the site content snapshot (FAQs, pricing, testimonials).
//
// The snapshot in Netlify Blobs is kept fresh by the daily scheduled
// sync-site-data function. This endpoint just reads it. The stale check
// below is a safety net only: if the schedule has somehow missed a run
// (or the store is empty on a brand-new site), it refreshes on demand.
//
// A failed Airtable fetch is never cached. If Airtable is unreachable,
// the last good snapshot is served instead, however old it is.

import { getStore } from "@netlify/blobs";
import { fetchAndTransform, writeSnapshot } from "./sync-site-data.mjs";

// Longer than the 24h sync interval so the schedule normally wins.
const STALE_MS = 36 * 60 * 60 * 1000;

const json = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

export default async () => {
  const cached = await getStore("site-data")
    .get("content", { type: "json" })
    .catch(() => null);

  if (cached && Date.now() - cached.cachedAt < STALE_MS) {
    return json(cached.data);
  }

  try {
    const data = await fetchAndTransform(process.env.AIRTABLE_API_TOKEN);
    await writeSnapshot(data, "demand").catch(() => {});
    return json(data);
  } catch (err) {
    console.error(`get-site-data: Airtable fetch failed: ${err.message}`);
    if (cached) return json(cached.data); // stale beats empty
    return json({ faqs: null, packages: null, testimonials: null });
  }
};

export const config = { path: "/api/site-data" };
