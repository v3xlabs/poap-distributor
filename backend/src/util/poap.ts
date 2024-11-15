import { errAsync, fromPromise, type ResultAsync } from "neverthrow";

export type ClaimResponse = {
    claimed: boolean;
};

export const isClaimed = (id: string): ResultAsync<ClaimResponse, Error> => {
    return fromPromise(
        fetch(`https://frontend.poap.tech/actions/claim-qr?qr_hash=${id}`, {
            headers: {
                origin: "https://collectors.poap.xyz",
            },
        }),
        (e) =>
            new Error(`Failed to fetch POAP claim status`, {
                cause: e,
            })
    ).andThen((response) => {
        if (!response.ok) {
            return errAsync(
                new Error(
                    `Failed to fetch POAP claim status: ${response.statusText}`
                )
            );
        }

        return fromPromise(
            response.json() as Promise<ClaimResponse>,
            (e) =>
                new Error(`Failed to parse POAP claim status`, {
                    cause: e,
                })
        );
    });
};
