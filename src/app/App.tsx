import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BootstrapMap } from '../features/bootstrap-map/BootstrapMap';
import { ErrorBoundary } from './ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      gcTime: Number.POSITIVE_INFINITY,
      retry: 0
    }
  }
});

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BootstrapMap />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
