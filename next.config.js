const withMdxEnhanced = require('next-mdx-enhanced');
const mdxPrism = require('mdx-prism');
const readingTime = require('reading-time');
const generateSitemap = require('./scripts/generate-sitemap');
const generateRSS = require('./scripts/generate-rss');

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [mdxPrism],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => ({
      readingTime: readingTime(mdxContent)
    }),
    phase: 'both'
  },
  reExportDataFetching: false
})({
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
      generateRSS();
    }

    return config;
  }
});
