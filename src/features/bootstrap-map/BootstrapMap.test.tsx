import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { appMetadata } from '../../shared/metadata';
import { BootstrapMap } from './BootstrapMap';

function renderMap() {
  return render(<BootstrapMap />);
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
    expect(screen.getAllByText(appMetadata.commit)).not.toHaveLength(0);
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

  it('exposes references and a copyable snippet for items that have them', () => {
    window.localStorage.clear();
    renderMap();

    // Conventional Commits item has both a reference link and a snippet.
    expect(screen.getByRole('link', { name: /conventional commits 1\.0\.0/i })).toHaveAttribute(
      'href',
      'https://www.conventionalcommits.org/en/v1.0.0/'
    );
    expect(screen.getByText(/feat\(parser\): accept newline at end of file/)).toBeInTheDocument();

    // The bundle-budget snippet is real, not a placeholder.
    expect(screen.getByText(/200 \* 1024/)).toBeInTheDocument();
  });
});
