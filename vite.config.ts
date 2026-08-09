import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Plugin to remove crossorigin attribute from HTML tags for InfinityFree compatibility
const removeCrossoriginPlugin = (): Plugin => ({
  name: 'remove-crossorigin',
  transformIndexHtml(html) {
    return html.replace(/\s+crossorigin(=["'][^"']*["'])?/gi, '');
  },
});

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), removeCrossoriginPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      modulePreload: false,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
