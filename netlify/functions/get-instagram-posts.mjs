// Token sourcing:
//   1. Netlify Blobs (store "instagram", key "token") — kept fresh by the
//      scheduled refresh-instagram-token function
//   2. INSTAGRAM_ACCESS_TOKEN env var — seed / local-dev fallback

import { getStore } from "@netlify/blobs";

const FIELDS = "id,caption,media_type,media_url,permalink,timestamp";
const API_VERSION = "v22.0";

async function getToken() {
  try {
    const stored = await getStore("instagram").get("token", { type: "json" });
    if (stored?.token) return stored.token;
  } catch {
    // Blobs unavailable (e.g. plain local dev) — fall through to env var
  }
  return process.env.INSTAGRAM_ACCESS_TOKEN;
}

export default async () => {
  const token = await getToken();

  if (!token) {
    return new Response(JSON.stringify({ error: "Instagram not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const params = new URLSearchParams({ fields: FIELDS, access_token: token });
  const res = await fetch(
    `https://graph.instagram.com/${API_VERSION}/me/media?${params}`
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch Instagram posts" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data } = await res.json();

  const posts = (data ?? [])
    .filter(p => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
    .map(p => ({
      id: p.id,
      imageUrl: p.media_url,
      caption: p.caption ?? "",
      permalink: p.permalink,
    }));

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/instagram-posts" };
