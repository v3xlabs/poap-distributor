import pino from "pino";
import { environment } from "./environment";

export const logger = pino({
    level: environment.LOG_LEVEL,
    formatters: {
        level(label) {
            return { level: label };
        },
    },
});
