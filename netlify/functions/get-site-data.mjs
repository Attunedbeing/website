import { getStore } from "@netlify/blobs";
import { fetchAndTransform } from "./sync-site-data.mjs";

const TTL_MS = 24 * 60 * 60 * 1000;

export default async () => {
  const store = getStore("site-data");
  const cached = await store.get("content", { type: "json" }).catch(() => null);

  if (cached && Date.now() - cached.cachedAt < TTL_MS) {
    return new Response(JSON.stringify(cached.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await fetchAndTransform(process.env.AIRTABLE_API_TOKEN);
  await store.setJSON("content", { data, cachedAt: Date.now() }).catch(() => {});

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/site-data" };
