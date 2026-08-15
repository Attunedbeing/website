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

export async function fetchAndTransform(apiKey) {
  const headers = { Authorization: `Bearer ${apiKey}` };

  const [faqsResult, pricingResult, testimonialsResult] = await Promise.allSettled([
    fetch(TABLES.faqs, { headers }).then(r => r.json()),
    fetch(TABLES.pricing, { headers }).then(r => r.json()),
    fetch(TABLES.testimonials, { headers }).then(r => r.json()),
  ]);

  return {
    faqs: faqsResult.status === "fulfilled"
      ? faqsResult.value.records?.map(r => ({
          id: r.id,
          question: r.fields["Name"] ?? "",
          answer: r.fields["Notes"] ?? "",
          order: r.fields["Order"] ?? 0,
        })) ?? null
      : null,
    packages: pricingResult.status === "fulfilled"
      ? pricingResult.value.records?.map(r => ({
          id: r.id,
          name: r.fields["Package Name"] ?? "",
          duration: r.fields["Duration"] ?? "",
          price: r.fields["Price"] ?? "",
          featured: r.fields["Featured"] === true,
          desc: r.fields["Description"] ?? "",
          features: (r.fields["Features"] ?? "").split("\n").filter(f => f.trim() !== ""),
          order: r.fields["Order"] ?? 0,
          active: r.fields["Active"] === true,
        })).filter(p => p.name.trim() !== "" || String(p.price).trim() !== "") ?? null
      : null,
    testimonials: testimonialsResult.status === "fulfilled"
      ? testimonialsResult.value.records?.map(r => ({
          id: r.id,
          name: r.fields["Name"] ?? "",
          message: r.fields["Testimonial message"] ?? "",
          featured: r.fields["Featured"] === true,
          order: r.fields["Order"] ?? 0,
        })) ?? null
      : null,
  };
}

