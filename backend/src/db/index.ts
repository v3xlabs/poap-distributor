import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { logger } from "../util/logger";
import { environment } from "../util/environment";
import * as schema from "./schema";

export const db = drizzle(environment.DB_FILE_NAME, { schema });

if (!environment.SKIP_MIGRATION) {
    // import.meta.url is the path to the current file, ../drizzle/migrations
    const migrationsFolder = new URL("../../drizzle", import.meta.url).pathname;
    logger.info({ migrationsFolder }, `Migrating database`);
    migrate(db, {
        migrationsFolder,
    });

    logger.info(`Database migrated`);
}
