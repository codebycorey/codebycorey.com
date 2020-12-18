const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

const generateSitemap = async () => {
  const pages = await globby([
    'pages/**/*.{ts,tsx,mdx}',
    '_content/**/*.mdx',
    '!pages/**/[*.{ts,tsx}',
    '!pages/_*.{ts,tsx}',
    '!pages/api',
    '!pages/admin.tsx'
  ]);

  urlSet = pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('_content', '')
        .replace(/(.tsx|.ts)/, '')
        .replace('.mdx', '');
      const route = path === '/index' ? '' : path;
      return `<url><loc>https://codebycorey.com${route}</loc></url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
};

module.exports = generateSitemap;
