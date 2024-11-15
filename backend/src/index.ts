import { Hono } from "hono";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import {
    honoErrorHandler,
    loggerProviderMiddleware,
    requestLoggerMiddleware,
} from "./util/hono";
import { routesRouter } from "./routes/_";

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

export default app;
