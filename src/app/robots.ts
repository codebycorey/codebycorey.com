import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://codebycorey.com/sitemap.xml',
    host: 'https://codebycorey.com',
  };
}
