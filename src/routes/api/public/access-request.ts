import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  requestType: z.enum(["register", "signin", "partnership"]),
  firstName: z.string().trim().max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  email: z.string().trim().email().max(255),
  organization: z.string().trim().max(160).optional(),
  note: z.string().trim().max(1000).optional(),
  source: z.string().trim().max(80).optional(),
});

export const Route = createFileRoute("/api/public/access-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }

        const d = parsed.data;
        const { error } = await supabaseAdmin.from("access_requests").insert({
          request_type: d.requestType,
          first_name: d.firstName ?? null,
          last_name: d.lastName ?? null,
          email: d.email,
          organization: d.organization ?? null,
          note: d.note ?? null,
          source: d.source ?? null,
        });

        if (error) {
          console.error("[access-request] insert failed:", error);
          return Response.json({ error: "Failed to save request" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
