export default async (req) => {
  const apiKey = process.env.AIRTABLE_API_TOKEN;
  const baseId = "appR5ETzMTA0JNTPH";

  const params = new URLSearchParams({
    "sort[0][field]": "Name",
    "sort[0][direction]": "asc",
  });

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/tblcQbOJZpUBwBx6p?${params}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch FAQs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  const faqs = data.records.map((record) => ({
    id: record.id,
    question: record.fields["Name"] ?? "",
    answer: record.fields["Notes"] ?? "",
    order: record.fields["Order"] ?? 0,
  }));

  return new Response(JSON.stringify(faqs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/faqs" };
