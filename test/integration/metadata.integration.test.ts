import { describe, expect, it } from 'vitest';
import { appMetadata } from '../../src/shared/metadata';

describe('public metadata contract', () => {
  it('exposes complete URLs for the live site, repository, and support link', () => {
    expect(appMetadata.liveUrl).toBe('https://baditaflorin.github.io/project-bootstrap-meta/');
    expect(appMetadata.repositoryUrl).toBe(
      'https://github.com/baditaflorin/project-bootstrap-meta'
    );
    expect(appMetadata.paypalUrl).toBe('https://www.paypal.com/paypalme/florinbadita');
  });
});
