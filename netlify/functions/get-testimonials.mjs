export default async (req) => {
  const apiKey = process.env.AIRTABLE_API_TOKEN;
  const baseId = "appR5ETzMTA0JNTPH";

  const params = new URLSearchParams({
    maxRecords: "10",
    filterByFormula: "{Active} = 1",
    "sort[0][field]": "Order",
    "sort[0][direction]": "asc",
  });

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/Testimonials?${params}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch testimonials" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  const testimonials = data.records.map((record) => ({
    id: record.id,
    name: record.fields["Name"] ?? "",
    message: record.fields["Testimonial message"] ?? "",
    featured: record.fields["Featured"] === true,
    order: record.fields["Order"] ?? 0,
  }));

  return new Response(JSON.stringify(testimonials), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/testimonials" };
