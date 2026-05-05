import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://codebycorey.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    react(),
    tailwind(),
    sitemap({ filter: (page) => !page.includes('/og/') }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
  },
  experimental: {
    csp: {
      algorithm: 'SHA-256',
      scriptDirective: {
        resources: ["'self'", 'https://cdn.usefathom.com'],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
      directives: [
        "default-src 'self' cdn.usefathom.com",
        "img-src 'self' blob: data: cdn.usefathom.com",
        "connect-src 'self' cdn.usefathom.com https://small-ostrich-582.convex.cloud wss://small-ostrich-582.convex.cloud",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
    },
  },
});
