import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(): void {
    // Production logging is intentionally absent for Mode A. See ADR 0011.
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#f7f7f0] p-6 text-[#17201b]">
          <section className="max-w-md rounded-lg border border-[#d7dacd] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#b45309]">
              Recovery needed
            </p>
            <h1 className="mt-2 text-2xl font-bold">The bootstrap map hit an unexpected state.</h1>
            <p className="mt-3 text-sm leading-6 text-[#4a554d]">
              Reloading usually restores the static app. Saved checklist progress remains in your
              browser unless you reset it.
            </p>
            <button
              className="mt-5 rounded-md bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115e59]"
              type="button"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
