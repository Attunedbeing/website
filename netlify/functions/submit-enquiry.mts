export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("AIRTABLE_API_TOKEN");
  const baseId = "appR5ETzMTA0JNTPH";

  const body = await req.json();
  const { name, email, message, interest } = body;

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/tbl49mJe979penoD4`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              fld6ZMtE8JeGcdOCw: name,
              fldC1UaUd18McnRwY: message,
              fldsTnEdh9ceNSA1n: email,
              fldgbsDtXHfSr7ria: interest,
            },
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to submit enquiry" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/enquiry",
};
