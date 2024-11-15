import { Hono } from "hono";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import {
    honoErrorHandler,
    loggerProviderMiddleware,
    requestLoggerMiddleware,
} from "./util/hono";
import { routesRouter } from "./routes/_";
import { checkClaims } from "./checker";
import { logger } from "./util/logger";

const app = new Hono()
    .use(cors())
    .use("*", requestId())
    .use(loggerProviderMiddleware)
    // Add health check before request tracer to avoid unnecessary log spam
    .get("/health", async (c) => {
        return c.json({ status: "ok" });
    })
    .use(requestLoggerMiddleware)
    .route("/", routesRouter)
    .onError(honoErrorHandler);

setInterval(async () => {
    const _logger = logger.child({
        type: "interval",
    });

    await checkClaims(_logger).catch((e) => {
        _logger.error(e, "Failed to check POAP claims");
    });
}, 1000 * 60 * 5);

export default app;
