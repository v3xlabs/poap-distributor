import './global.css';

import { useMutation } from '@tanstack/react-query';
import { FiLoader } from 'react-icons/fi';

export const BACKEND_URL = 'https://music-poap-distributor.c5.v3x.systems';

export const App = () => {
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BACKEND_URL}/poap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = data.url;

                return;
            }

            throw new Error(data.error);
        },
    });

    return (
        <div className="w-full min-h-screen bg-ens-light-background-secondary pt-12 px-4">
            <div className="p-4 border-ens-light-border text-center bg-ens-light-background-primary text-ens-light-text-primary mx-auto max-w-xl w-full border rounded-xl space-y-4">
                <h1 className="font-bold text-2xl">Claim Music Stage POAP</h1>
                <p>Music is really cool, and so are you!</p>
                <div className="h-[128px] w-full">
                    <img
                        src="/music-poap.png"
                        alt="Music Stage"
                        className="h-full object-contain mx-auto"
                    />
                </div>
                <p>Click the button below to claim your POAP.</p>
                <button
                    className="bg-ens-light-blue-primary flex justify-between items-center w-full text-ens-light-background-primary px-4 py-2 rounded-md disabled:opacity-50"
                    disabled={isPending}
                    onClick={() => mutate()}
                >
                    <span></span>
                    <span>Claim POAP</span>
                    <span>
                        {isPending && <FiLoader className="animate-spin" />}
                    </span>
                </button>
                {isError && (
                    <div className="text-red-500">
                        <p className="font-bold">Error claiming POAP</p>
                        <p>{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
