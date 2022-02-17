const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: true,
};

const sentryConfig = {
  silent: true,
};

module.exports = withSentryConfig(
  withBundleAnalyzer(moduleExports),
  sentryConfig
);
