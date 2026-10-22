import { readFileSync, writeFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
// The same code ships to two sites; the address comes from .env (default) or .env.przemek (--mode przemek).
export default defineConfig(({ command, mode }) => {
  const { VITE_SITE_URL: siteUrl, VITE_PERSON_NAME: name, VITE_FAVICON: favicon } = loadEnv(mode, process.cwd(), '');
  const base = command === 'build' ? new URL(siteUrl).pathname : '/';

  return {
    plugins: [
      react(),
      {
        // public/404.html is copied as-is, so its hard-coded /pf/ is rewritten to this build's base
        name: 'base-in-404',
        apply: 'build',
        closeBundle() {
          const file = 'dist/404.html';
          writeFileSync(file, readFileSync(file, 'utf8').replaceAll('/pf/', base).replaceAll('Norbert Leksa', name).replaceAll('favicon.svg', favicon));
        },
      },
    ],
    base,
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  };
});
