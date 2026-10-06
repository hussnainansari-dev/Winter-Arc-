import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicit Base Path Resolution for GitHub Pages & Local Environments
const resolveBasePath = (command: string): string => {
  // During local development (npm run dev), serve from root '/'
  if (command === 'serve') {
    return '/';
  }

  // Explicit override via environment variables
  if (process.env.VITE_BASE) return process.env.VITE_BASE;
  if (process.env.BASE_URL) {
    const raw = process.env.BASE_URL.trim();
    if (raw) {
      return raw.endsWith('/') ? raw : `${raw}/`;
    }
  }

  // Auto-detect GitHub Actions repository context
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repoName) {
      if (repoName.toLowerCase().endsWith('.github.io')) {
        return '/';
      }
      return `/${repoName}/`;
    }
  }

  // Explicit production default for Winter Arc GitHub Pages project site (hussnainansari-dev/Winter-Arc)
  return '/Winter-Arc/';
};

// Vite plugin to generate 404.html from index.html for seamless GitHub Pages routing
const githubPagesSpaPlugin = (): Plugin => ({
  name: 'vite-plugin-github-pages-spa',
  closeBundle() {
    try {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    } catch (err) {
      console.warn('Unable to copy 404.html for GitHub Pages:', err);
    }
  },
});

export default defineConfig(({ command }) => {
  return {
    base: resolveBasePath(command),
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
