// Scheduled function: refreshes the long-lived Instagram access token weekly.
//
// Instagram Login tokens last 60 days and can be refreshed any time after
// they are 24 hours old. Each refresh returns a NEW token valid for another
// 60 days. Netlify env vars can't be rewritten from a function, so the
// current token lives in Netlify Blobs (store "instagram", key "token");
// INSTAGRAM_ACCESS_TOKEN is only the seed / fallback.

import { getStore } from "@netlify/blobs";

const API_VERSION = "v22.0";

export default async () => {
  const store = getStore("instagram");

  const stored = await store.get("token", { type: "json" }).catch(() => null);
  const currentToken = stored?.token ?? process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!currentToken) {
    console.error("refresh-instagram-token: no token available to refresh");
    return;
  }

  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: currentToken,
  });
  const res = await fetch(
    `https://graph.instagram.com/${API_VERSION}/refresh_access_token?${params}`
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`refresh-instagram-token: refresh failed (${res.status}): ${body}`);
    return;
  }

  const { access_token, expires_in } = await res.json();

  await store.setJSON("token", {
    token: access_token,
    refreshedAt: new Date().toISOString(),
    expiresInSeconds: expires_in,
  });

  console.log("refresh-instagram-token: token refreshed successfully");
};

// Every Monday at 03:00 UTC — well within the 60-day window, and tokens
// are always older than the 24-hour minimum age by then.
export const config = { schedule: "0 3 * * 1" };
