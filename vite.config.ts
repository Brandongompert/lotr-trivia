import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-env-replace',
      transformIndexHtml(html) {
        return html
          .replace(
            '%VITE_UMAMI_WEBSITE_ID%',
            process.env.VITE_UMAMI_WEBSITE_ID || '',
          )
          .replace('%VITE_UMAMI_URL%', process.env.VITE_UMAMI_URL || '');
      },
    },
  ],
});
