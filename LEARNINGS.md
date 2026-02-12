# Learnings

## Gotchas

- **Astro `client:load` still SSRs** — Components using `client:load` are server-rendered first, then hydrated. If a component depends on browser-only APIs or env vars not available at build time (like Convex's `PUBLIC_CONVEX_URL`), use `client:only="react"` to skip SSR entirely.
- **Astro islands are independent React roots** — You cannot share a React context provider across islands. Each island that needs ConvexProvider must wrap its own. Consolidate into fewer, larger islands to reduce WebSocket connections.
- **Astro `.env` overrides `.env.local`** — If a key exists in `.env` (even empty), it takes precedence over `.env.local`. Convex writes `CONVEX_URL` to `.env.local` but Astro needs `PUBLIC_` prefix for client access.
- **CSP `connect-src` wildcards don't cover `wss://`** — `*.convex.cloud` only matches HTTPS. WebSocket connections need explicit `wss://*.convex.cloud`.
- **Fathom `data-spa="auto"` is unnecessary for Astro** — Astro does full page loads, not client-side navigation. The default Fathom script handles tracking without it.
- **Fathom tracks preview deployments** — Without domain filtering (dashboard firewall or `data-included-domains`), Vercel preview URLs inflate analytics.
