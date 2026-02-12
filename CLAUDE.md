# CodeByCorey

Personal blog and portfolio site for Corey O'Donnell at [codebycorey.com](https://codebycorey.com).

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Architecture

```
src/
  pages/              # Astro file-based routing
    index.astro       # Home page
    blog/index.astro  # Blog listing with search island
    blog/[slug].astro # Blog post (getStaticPaths)
    og/[slug].png.ts  # OG images (satori + resvg, build-time)
    robots.txt.ts     # Robots endpoint
  layouts/
    Layout.astro      # Base layout (head, sidebar, footer, fathom)
    BlogPost.astro    # Post layout (JSON-LD, OG meta, prose wrapper)
  components/
    Sidebar.astro           # Navigation sidebar
    Footer.astro            # Footer with links
    BlogLink.astro          # Blog post card
    WrappedLink.astro       # Internal/external link wrapper
    Fathom.astro            # Analytics script tag
    BlogSearch.tsx          # React island (client:load) — search + filtering
    ConvexClientProvider.tsx # Convex provider wrapper
    ConvexViewCount.tsx     # React island (client:only) — Convex view counts wrapper
    ViewCount.tsx           # View count display using Convex queries
  content/
    blog/             # MDX blog posts (frontmatter: title, brief, date)
  content.config.ts   # Zod schema for blog collection
  lib/
    navigation.ts     # Shared link data for sidebar/footer
    search.ts         # Sequential fuzzy search
  styles/global.css   # Tailwind + custom styles
convex/
  schema.ts           # Convex schema (pages table)
  pages.ts            # Convex queries and mutations for view counts
  _generated/         # Generated Convex API types
```

## Conventions

- **Framework**: Astro (static output) with React islands for interactivity
- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v3 with `@tailwindcss/typography` for prose
- **Formatting**: Prettier — 2-space indent, single quotes, trailing commas (es5), semicolons
- **Content**: Blog posts are `.mdx` files in `src/content/blog/` with YAML frontmatter
- **Syntax highlighting**: Shiki (build-time, catppuccin-mocha theme)
- **Security**: CSP and security headers in `vercel.json`
- **Analytics**: Fathom (privacy-focused, script tag)
- **Deployment**: Vercel with `@astrojs/vercel` adapter
- **Package manager**: pnpm
