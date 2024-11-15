import { createBaseApp } from "../util/hono";
import { adminRouter } from "./admin";
import { poapRouter } from "./poap";

export const routesRouter = createBaseApp()
    .route("/poap", poapRouter)
    .route("/admin", adminRouter);
