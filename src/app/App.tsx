import { BootstrapMap } from '../features/bootstrap-map/BootstrapMap';
import { ErrorBoundary } from './ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <BootstrapMap />
    </ErrorBoundary>
  );
}
