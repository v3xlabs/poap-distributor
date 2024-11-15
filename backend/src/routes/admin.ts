import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { createBaseApp } from "../util/hono";
import { z } from "zod";
import { links } from "../db/schema";
import { eq } from "drizzle-orm";
import { bearerAuth } from "hono/bearer-auth";
import { environment } from "../util/environment";
import { checkClaims } from "../checker";
import { streamSSE } from "hono/streaming";

// Sub router at /admin
export const adminRouter = createBaseApp()
    .use("/*", bearerAuth({ token: environment.ADMIN_TOKEN }))
    .get("/links", async (c) => {
        const links = await db.query.links.findMany();
        return c.json(links);
    })
    .get(
        "/links/:id",
        zValidator(
            "param",
            z.object({
                id: z.coerce.number(),
            })
        ),
        async (c) => {
            const { id } = c.req.valid("param");

            const link = await db.query.links.findFirst({
                where: (links, { eq }) => eq(links.id, id),
            });

            if (!link) {
                return c.json({ error: "Link not found" }, 404);
            }

            return c.json(link);
        }
    )
    .post(
        "/links",
        zValidator(
            "json",
            z
                .object({
                    url: z.string(),
                    used: z.boolean().optional(),
                })
                .strip()
        ),
        async (c) => {
            const body = c.req.valid("json");

            if (!body.url) {
                return c.json({ error: "URL is required" }, 400);
            }

            const result = await db
                .insert(links)
                .values({
                    url: body.url,
                    used: body.used ?? false,
                })
                .returning({
                    id: links.id,
                })
                .then(([result]) => result);

            return c.json({ id: result.id }, 201);
        }
    )
    // Bulk insert links
    .post(
        "/links/bulk",
        zValidator(
            "json",
            z.array(
                z
                    .object({
                        url: z.string(),
                        used: z.boolean().optional(),
                    })
                    .strip()
            )
        ),
        async (c) => {
            const body = c.req.valid("json");
            const result = await db
                .insert(links)
                .values(body)
                .returning({ id: links.id });
            return c.json(result, 201);
        }
    )
    .put(
        "/links/:id",
        zValidator(
            "param",
            z.object({
                id: z.coerce.number(),
            })
        ),
        zValidator(
            "json",
            z
                .object({
                    url: z.string(),
                    used: z.boolean(),
                })
                .partial()
                .strip()
        ),
        async (c) => {
            const { id } = c.req.valid("param");
            const body = c.req.valid("json");

            const result = await db
                .update(links)
                .set(body)
                .where(eq(links.id, id))
                .returning({
                    id: links.id,
                })
                .then(([result]) => result);

            if (!result) {
                return c.json({ error: "Link not found" }, 404);
            }

            return c.json({ success: true });
        }
    )
    .delete(
        "/links/:id",
        zValidator(
            "param",
            z.object({
                id: z.coerce.number(),
            })
        ),
        async (c) => {
            const { id } = c.req.valid("param");

            const result = await db
                .delete(links)
                .where(eq(links.id, id))
                .returning({
                    id: links.id,
                })
                .then(([result]) => result);

            if (!result) {
                return c.json({ error: "Link not found" }, 404);
            }

            return c.json({ success: true });
        }
    )
    .get("/check_poaps", (c) =>
        streamSSE(c, async (stream) => {
            const checker = checkClaims(c.var.logger, (message) => {
                stream.writeSSE({
                    data: message,
                    event: "message",
                });
            });

            await checker;
            stream.writeSSE({
                data: "done",
                event: "done",
            });
            await stream.sleep(200);
            await stream.close();
        })
    );
