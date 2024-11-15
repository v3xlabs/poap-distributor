import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    url: text("url").notNull(),
    used: integer("used", { mode: "boolean" }).default(false),
});
