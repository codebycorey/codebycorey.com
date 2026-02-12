import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: https://codebycorey.com/sitemap-index.xml
Host: https://codebycorey.com
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
