import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: ['node_modules/**', 'dist/**', 'docs/**', 'test/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70
      },
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/app/**', 'src/generated/**', 'src/main.tsx', 'src/shared/externalLinks.ts']
    }
  }
});
