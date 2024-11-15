import { eq } from "drizzle-orm";
import { db } from "../db";
import { links } from "../db/schema";
import { createBaseApp } from "../util/hono";

export const poapRouter = createBaseApp().post("/", async (c) => {
    const { logger } = c.var;

    const link = await db.query.links.findFirst({
        where: (links, { eq }) => eq(links.used, false),
    });

    if (!link) {
        return c.json({ error: "No link found" }, 404);
    }

    logger.trace("Redirecting to link", { linkId: link.id });

    await db.update(links).set({ used: true }).where(eq(links.id, link.id));

    return c.json({
        url: link.url,
    });
});
