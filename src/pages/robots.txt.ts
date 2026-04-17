import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Disallow: /og/

Sitemap: https://codebycorey.com/sitemap-index.xml
Host: codebycorey.com
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
