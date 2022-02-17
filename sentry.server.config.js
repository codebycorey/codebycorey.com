// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn:
    SENTRY_DSN ||
    'https://e145f94dff0d4fcaa5ef6fdb42cbeb31@o1146015.ingest.sentry.io/6214305',
  // Adjust this value in production, or use tracesSampler for greater control
  // tracesSampleRate: 0.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
