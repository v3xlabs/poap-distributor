import { Hono } from "hono";
import { createFactory } from "hono/factory";
import type { HonoOptions } from "hono/hono-base";
import type {
    BlankEnv,
    BlankSchema,
    Env,
    ErrorHandler,
    Schema,
} from "hono/types";
import { logger } from "./logger";
import "hono/request-id";
import { HTTPException } from "hono/http-exception";

type Variables = {
    logger: typeof logger;
};

type BaseEnv = {
    Variables: Variables;
};

export const honoFactory = createFactory<BaseEnv>();

export const loggerProviderMiddleware = honoFactory.createMiddleware(
    async (c, next) => {
        const childLogger = logger.child({
            type: "request",
            requestId: c.get("requestId"),
            path: c.req.path,
            method: c.req.method,
        });

        c.set("logger", childLogger);

        await next();
    }
);

export const requestLoggerMiddleware = honoFactory.createMiddleware(
    async (c, next) => {
        const { logger } = c.var;

        logger.trace("Request received");

        const start = Date.now();

        await next();

        logger.trace(
            {
                status: c.res.status,
                duration: Date.now() - start,
            },
            "Request completed"
        );
    }
);

export const createBaseApp = <
    BasePath extends string = "/",
    E extends Env = BlankEnv,
    S extends Schema = BlankSchema
>(
    options?: HonoOptions<E & BaseEnv>
) => {
    const baseApp = new Hono<E & BaseEnv, S, BasePath>(options);

    return baseApp;
};

export const honoErrorHandler: ErrorHandler<BaseEnv> = async (error, c) => {
    const { logger, requestId } = c.var;

    if (error instanceof HTTPException) {
        logger.error({
            err: error,
            cause: error.cause,
        });

        if (error.res) {
            const newResponse = new Response(error.res.body, {
                status: error.status,
                headers: error.res.headers,
            });
            return newResponse;
        }

        if (!error.message) {
            return error.getResponse();
        }

        return c.json(
            {
                message: error.message,
                code: "HTTP_EXCEPTION",
            },
            error.status
        );
    }

    logger.error(error);

    return c.json(
        {
            message: "Internal server error " + requestId,
            code: "INTERNAL_SERVER_ERROR",
        },
        500
    );
};
