import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./client/test/setup.ts'],
    globals: true,
    css: true,
    reporters: ['verbose'],
    include: ['client/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'Service_TheEleFit/',
      'client/test/',
      'client/main.tsx',
      '**/*.d.ts',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'Service_TheEleFit/',
        'client/test/',
        'client/main.tsx',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
