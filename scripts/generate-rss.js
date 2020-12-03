const fs = require('fs');
const path = require('path');
const globby = require('globby');
const prettier = require('prettier');
const Feed = require('feed').Feed;
const frontMatter = require('front-matter');

const generateRSS = async () => {
  const pages = await globby(['pages/blog/*.mdx']);

  const posts = pages
    .map((page) => {
      const fileName = page.replace('pages/blog/', '').replace('.mdx', '');
      const postPath = path.join(process.cwd(), page);
      const postContent = fs.readFileSync(postPath, 'utf8');
      const { attributes } = frontMatter(postContent);
      return { ...attributes, fileName };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const feed = new Feed({
    title: 'Blog | Code By Corey',
    id: 'https://codebycorey.com',
    link: 'https://codebycorey.com',
    description: 'Web developer and TypeScript enthusiast',
    language: 'en',
    copyright: "Copyright 2020, Corey O'Donnell",
    feedLinks: {
      rss: 'https://codebycorey.com/rss.xml'
    },
    author: {
      name: "Corey O'Donnell",
      link: 'https://twitter.com/codebycorey'
    }
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      // id: `https://codebycorey.com/blog/${post.fileName}`,
      link: `https://codebycorey.com/blog/${post.fileName}`,
      date: new Date(post.date),
      description: post.brief,
      image: `https://codebycorey.com/static/images/${post.fileName}/header.png`,
      author: {
        name: "Corey O'Donnell",
        link: 'https://twitter.com/codebycorey'
      }
    });
  });

  const rss = feed.rss2();
  fs.writeFileSync('./public/rss.xml', rss);
};

module.exports = generateRSS;
