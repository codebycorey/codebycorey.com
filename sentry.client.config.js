// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn:
    SENTRY_DSN ||
    'https://e145f94dff0d4fcaa5ef6fdb42cbeb31@o1146015.ingest.sentry.io/6214305',
  // Adjust this value in production, or use tracesSampler for greater control

  integrations: [
    new Sentry.BrowserTracing({
      // custom options
    }),
  ],

  tracesSampleRate: 0.1,
});
