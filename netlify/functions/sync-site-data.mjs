// Scheduled function: pulls FAQs, pricing and testimonials from Airtable
// once a day and writes the snapshot to Netlify Blobs (store "site-data",
// key "content"). get-site-data.mjs serves that snapshot to the site.
//
// The snapshot is only overwritten when every Airtable request succeeds.
// If anything fails, the previous snapshot is left in place, so a brief
// Airtable outage can never lock empty content into the cache.

import { getStore } from "@netlify/blobs";

const BASE_ID = "appR5ETzMTA0JNTPH";

const TABLES = {
  faqs: `https://api.airtable.com/v0/${BASE_ID}/tblcQbOJZpUBwBx6p?${new URLSearchParams({
    "sort[0][field]": "Name",
    "sort[0][direction]": "asc",
  })}`,
  pricing: `https://api.airtable.com/v0/${BASE_ID}/Prices?${new URLSearchParams({
    "sort[0][field]": "Order",
    "sort[0][direction]": "asc",
  })}`,
  testimonials: `https://api.airtable.com/v0/${BASE_ID}/Testimonials?${new URLSearchParams({
    maxRecords: "10",
    filterByFormula: "{Active} = 1",
    "sort[0][field]": "Order",
    "sort[0][direction]": "asc",
  })}`,
};

async function fetchRecords(name, url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Airtable ${name}: HTTP ${res.status}`);
  }
  const body = await res.json();
  if (!Array.isArray(body.records)) {
    throw new Error(`Airtable ${name}: response had no records array`);
  }
  return body.records;
}

/**
 * Fetches all three tables and transforms them into the site's content
 * shape. Throws if ANY request fails - callers must treat that as
 * "no new data" rather than caching partial/empty results.
 */
export async function fetchAndTransform(apiKey) {
  if (!apiKey) throw new Error("AIRTABLE_API_TOKEN is not set");
  const headers = { Authorization: `Bearer ${apiKey}` };

  const [faqs, pricing, testimonials] = await Promise.all([
    fetchRecords("faqs", TABLES.faqs, headers),
    fetchRecords("pricing", TABLES.pricing, headers),
    fetchRecords("testimonials", TABLES.testimonials, headers),
  ]);

  return {
    faqs: faqs.map(r => ({
      id: r.id,
      question: r.fields["Name"] ?? "",
      answer: r.fields["Notes"] ?? "",
      order: r.fields["Order"] ?? 0,
    })),
    packages: pricing
      .map(r => ({
        id: r.id,
        name: r.fields["Package Name"] ?? "",
        duration: r.fields["Duration"] ?? "",
        price: r.fields["Price"] ?? "",
        featured: r.fields["Featured"] === true,
        desc: r.fields["Description"] ?? "",
        features: (r.fields["Features"] ?? "").split("\n").filter(f => f.trim() !== ""),
        order: r.fields["Order"] ?? 0,
        active: r.fields["Active"] === true,
      }))
      .filter(p => p.name.trim() !== "" || String(p.price).trim() !== ""),
    testimonials: testimonials.map(r => ({
      id: r.id,
      name: r.fields["Name"] ?? "",
      message: r.fields["Testimonial message"] ?? "",
      featured: r.fields["Featured"] === true,
      order: r.fields["Order"] ?? 0,
    })),
  };
}

/** Writes a fresh snapshot. Only called after fetchAndTransform succeeded. */
export async function writeSnapshot(data, refreshedBy) {
  await getStore("site-data").setJSON("content", {
    data,
    cachedAt: Date.now(),
    refreshedBy,
  });
}

export default async () => {
  try {
    const data = await fetchAndTransform(process.env.AIRTABLE_API_TOKEN);
    await writeSnapshot(data, "schedule");
    console.log(
      `sync-site-data: snapshot refreshed (${data.faqs.length} faqs, ` +
        `${data.packages.length} packages, ${data.testimonials.length} testimonials)`
    );
  } catch (err) {
    console.error(`sync-site-data: refresh failed, previous snapshot kept: ${err.message}`);
  }
};

// Daily at 15:00 UTC = 3am NZST / 4am NZDT, so edits made during the day
// in New Zealand are live overnight.
export const config = { schedule: "0 15 * * *" };
