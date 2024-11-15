import './global.css';

import { useMutation } from '@tanstack/react-query';

export const BACKEND_URL = 'https://music-poap-distributor.c5.v3x.systems';

export const App = () => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BACKEND_URL}/poap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                window.location.href = data.data;
            }
        },
    });

    return (
        <div className="w-full min-h-screen bg-ens-light-background-secondary pt-12 px-4">
            <div className="p-4 border-ens-light-border text-center bg-ens-light-background-primary text-ens-light-text-primary mx-auto max-w-xl w-full border rounded-xl space-y-4">
                <h1 className="font-bold text-2xl">Claim Music Stage POAP</h1>
                <p>Click the button below to claim your POAP.</p>
                <button
                    className="bg-ens-light-blue-primary w-full text-ens-light-background-primary px-4 py-2 rounded-md block"
                    onClick={() => mutate()}
                >
                    Claim POAP
                </button>
            </div>
        </div>
    );
};
