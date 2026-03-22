export default async (req) => {
  const apiKey = process.env.AIRTABLE_API_TOKEN;
  const baseId = "appR5ETzMTA0JNTPH";

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/Prices?sort%5B0%5D%5Bfield%5D=Order&sort%5B0%5D%5Bdirection%5D=asc`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch pricing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  const packages = data.records.map((record) => ({
    id: record.id,
    name: record.fields["Package Name"] ?? "",
    duration: record.fields["Duration"] ?? "",
    price: record.fields["Price"] ?? "",
    featured: record.fields["Featured"] === true,
    desc: record.fields["Description"] ?? "",
    features: (record.fields["Features"] ?? "").split("\n").filter((f) => f.trim() !== ""),
    order: record.fields["Order"] ?? 0,
    active: record.fields["Active"] === true,
  }));

  return new Response(JSON.stringify(packages), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/pricing" };
