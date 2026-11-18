import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const requestSchema = z.object({
  imageDataUrl: z.string().regex(/^data:image\/(png|jpeg);base64,/).max(7_000_000),
});

const outputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "limitations", "criteria", "recommendations"],
  properties: {
    summary: { type: "string" },
    limitations: { type: "string" },
    criteria: {
      type: "array", minItems: 3, maxItems: 5,
      items: { type: "object", additionalProperties: false, required: ["name", "score", "reason"], properties: {
        name: { type: "string" }, score: { type: "integer", minimum: 1, maximum: 5 }, reason: { type: "string" },
      } },
    },
    recommendations: { type: "array", minItems: 2, maxItems: 4, items: { type: "string" } },
  },
};

export const Route = createFileRoute("/api/public/analyze-neighborhood")({
  server: { handlers: { POST: async ({ request }) => {
    if (!process.env.OPENAI_API_KEY) return Response.json({ error: "Analysis is not configured on this deployment." }, { status: 503 });
    let body: unknown;
    try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: "Upload a PNG or JPEG smaller than 5 MB." }, { status: 400 });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [{ role: "user", content: [
          { type: "input_text", text: "Assess only visible, non-sensitive urban design features in this image. Do not identify people, infer demographics, claim a location, or invent measurements. Give practical but tentative suggestions and state visual limitations." },
          { type: "input_image", image_url: parsed.data.imageDataUrl },
        ] }],
        text: { format: { type: "json_schema", name: "neighborhood_assessment", strict: true, schema: outputSchema } },
      }),
    });
    if (!response.ok) return Response.json({ error: "The analysis provider did not complete the request." }, { status: 502 });
    const result = await response.json() as { output_text?: string };
    try { return Response.json(JSON.parse(result.output_text || "")); } catch { return Response.json({ error: "The analysis provider returned an invalid result." }, { status: 502 }); }
  } } },
});
