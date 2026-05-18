// Airtable setup required:
// Create a "Subscribers" table in your base with two fields:
//   - Email (single line text)
//   - Subscribed At (date)
// Then paste the table ID below (looks like tblXXXXXXXXXXXXXX)
const SUBSCRIBERS_TABLE_ID = "tblUmOH3WV4626WDR";

const BASE_ID = "appR5ETzMTA0JNTPH";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.AIRTABLE_API_TOKEN;
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check if already subscribed
  const search = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${SUBSCRIBERS_TABLE_ID}?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!search.ok) {
    return new Response(JSON.stringify({ error: "Failed to check subscription" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existing = await search.json();
  if (existing.records.length > 0) {
    // Already subscribed — succeed silently
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Add new subscriber
  const insert = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${SUBSCRIBERS_TABLE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Email: email,
            "Subscribed At": new Date().toISOString().split("T")[0],
          },
        }],
      }),
    }
  );

  if (!insert.ok) {
    return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/subscribe" };
