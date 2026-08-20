// Proxies the review-approval bar's "Approve changes" click to Smooth
// Landings HQ. Keeps SMOOTH_LANDINGS_APPROVAL_TOKEN server-side instead of
// shipping it in the client bundle (it was previously hardcoded in
// ReviewApproval.tsx, visible to anyone who viewed source on a preview link).

const APPROVAL_ENDPOINT = "https://www.smooth-landings.com/api/client-approval";

// The approval bar itself is hidden on the production hostnames (it only
// ever renders on preview/draft deploys), but that's a UI-only check - a
// direct POST to this endpoint would previously go through regardless of
// where it came from. Reject production-origin calls here too, so the
// approval flow can only ever be triggered from an actual preview page.
const isProductionOrigin = (req) => {
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  try {
    const host = origin ? new URL(origin).hostname : "";
    return host === "attunedbeing.co" || host === "www.attunedbeing.co";
  } catch {
    return false;
  }
};

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (isProductionOrigin(req)) {
    return new Response(JSON.stringify({ error: "Not available on the live site" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = process.env.SMOOTH_LANDINGS_APPROVAL_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: "Approval not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { comment } = await req.json().catch(() => ({}));

  const res = await fetch(APPROVAL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, comment: comment || undefined }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to send approval" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/approve-review" };
