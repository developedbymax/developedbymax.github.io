import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The repo is developedbymax.github.io — a GitHub *user* site, served from the
// domain root — so the base path is "/" and never "/repo-name/".
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'assets' },
});
