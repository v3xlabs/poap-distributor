import { bool, cleanEnv, str } from "envalid";

export const environment = cleanEnv(process.env, {
    SKIP_MIGRATION: bool({ default: false }),
    ADMIN_TOKEN: str(),
    DB_FILE_NAME: str(),
    LOG_LEVEL: str({ default: "info", devDefault: "trace" }),
});
