import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App';

const queryClient = new QueryClient();
const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
