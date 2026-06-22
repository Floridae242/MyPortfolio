import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// Vite preview serves static files from dist/ before the SPA fallback, so
// /admin resolves to dist/admin.html instead of the React app. This plugin
// intercepts SPA client routes (paths without a file extension and not ending
// in .html) and serves dist/index.html so e2e tests see the correct React page.
function spaPreviewFallbackPlugin() {
  return {
    name: 'spa-preview-fallback',
    configurePreviewServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = req.url ?? '/';
        const isFile = /\.[a-zA-Z0-9]+$/.test(url.split('?')[0]);
        const isApiRoute = url.startsWith('/api/');
        if (!isFile && !isApiRoute) {
          const indexPath = path.resolve(__dirname, 'dist', 'index.html');
          if (fs.existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html');
            res.end(fs.readFileSync(indexPath));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), spaPreviewFallbackPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/react|react-dom|react-router-dom/.test(id)) return 'react-vendor';
            if (id.includes('gsap')) return 'gsap';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
} as any);
