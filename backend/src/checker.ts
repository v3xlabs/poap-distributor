import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "./db";
import { links, links as linksTable } from "./db/schema";
import { batcher } from "./util/batch";
import { isClaimed, type ClaimResponse } from "./util/poap";
import { logger as baseLogger } from "./util/logger";
import { err, fromThrowable, ok, type Result } from "neverthrow";

const extractId = (link: string): Result<string, Error> => {
    // error if not matching /mint/ID
    const url = fromThrowable(
        () => new URL(link),
        (cause) => new Error("Failed to parse link", { cause })
    )();

    if (url.isErr()) {
        return err(url.error);
    }

    const match = url.value.pathname.match(/^\/mint\/(.+)$/);
    if (!match || match.length < 2) {
        return err(new Error(`Invalid link: ${link}`));
    }

    // Return matching group 1
    return ok(match[1]);
};

export const checkClaims = async (
    logger: typeof baseLogger = baseLogger,
    emitter?: (message: string) => void
) => {
    const emit = emitter ?? (() => {});

    logger.info("Checking POAP claims");
    emit("Checking POAP claims");

    const usedLinks = await db.query.links.findMany({
        where: or(eq(linksTable.claimed, false), isNull(linksTable.claimed)),
    });

    const batches = batcher(usedLinks, 10);
    const results: {
        linkId: number;
        poapId: string | null;
        result: Result<ClaimResponse, Error>;
    }[] = [];

    let i = 0;
    for (const batch of batches) {
        i++;
        logger.trace(
            {
                batch: i,
                total: batches.length,
            },
            `Checking batch`
        );
        emit(`Checking batch ${i} of ${batches.length}`);

        const batchResults = await Promise.all(
            batch.map(async (link) => {
                const poapId = extractId(link.url);
                if (poapId.isErr()) {
                    return {
                        linkId: link.id,
                        poapId: null,
                        result: err(poapId.error),
                    };
                }
                const result = await isClaimed(poapId.value);
                return {
                    linkId: link.id,
                    poapId: poapId.value,
                    result,
                };
            })
        );

        results.push(...batchResults);

        logger.trace(
            {
                batch: i,
                total: batches.length,
                failed: batchResults.filter(({ result }) => result.isErr())
                    .length,
            },
            `Batch completed`
        );
        emit(`Batch ${i} completed`);
    }

    logger.info(
        {
            total: results.length,
            failed: results.filter(({ result }) => result.isErr()).length,
        },
        "All batches completed"
    );
    emit(`All batches completed`);

    let unclaimed: number[] = [];

    for (const { linkId, poapId, result } of results) {
        if (result.isErr()) {
            logger.error(
                { linkId, poapId, error: `${result.error}` },
                "Failed to check claim"
            );
            emit(`${linkId}: Failed to check claim: ${result.error}`);
        } else {
            if (result.value.claimed) {
                logger.trace({ linkId, poapId }, "POAP has been Claimed");
                emit(`${linkId}: POAP has been Claimed`);

                await db
                    .update(linksTable)
                    .set({ claimed: true })
                    .where(eq(linksTable.id, linkId));
            } else {
                logger.trace({ linkId, poapId }, "POAP has not been Claimed");
                unclaimed.push(linkId);

                await db
                    .update(linksTable)
                    .set({ claimed: false, used: false })
                    .where(eq(linksTable.id, linkId));
            }
        }
    }

    emit(`Unclaimed POAPs (${unclaimed.length}): ${unclaimed.join(", ")}`);

    emit(`All POAPs checked`);

    return results;
};
