import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'CodeByCorey',
    description: 'Software engineer, TypeScript enthusiast, and creator',
    site: context.site ?? 'https://codebycorey.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.brief,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
}
