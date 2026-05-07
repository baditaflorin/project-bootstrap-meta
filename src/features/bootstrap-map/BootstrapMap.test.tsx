import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { BootstrapMap } from './BootstrapMap';

function renderMap() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BootstrapMap />
    </QueryClientProvider>
  );
}

describe('BootstrapMap', () => {
  it('renders public project links and build metadata', () => {
    renderMap();

    expect(screen.getByRole('heading', { name: /project bootstrap meta/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /star the repository/i })).toHaveAttribute(
      'href',
      'https://github.com/baditaflorin/project-bootstrap-meta'
    );
    expect(screen.getByRole('link', { name: /support the work/i })).toHaveAttribute(
      'href',
      'https://www.paypal.com/paypalme/florinbadita'
    );
    expect(screen.getAllByText('0.1.0')).not.toHaveLength(0);
    expect(screen.getAllByText('dev')).not.toHaveLength(0);
  });

  it('tracks checklist progress and can reset it', () => {
    window.localStorage.clear();
    renderMap();

    expect(screen.getByText('0/27 checks')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /project name is kebab-case/i }));
    expect(screen.getByText('1/27 checks')).toBeInTheDocument();

    fireEvent.click(
      within(screen.getByLabelText('Project progress')).getByRole('button', { name: /^reset$/i })
    );
    expect(screen.getByText('0/27 checks')).toBeInTheDocument();
  });
});
