import { getOrderedBlogPosts } from '@/lib/mdx';
import { BlogFile } from '@/types/mdx.types';
import { MetadataRoute } from 'next';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = (await getOrderedBlogPosts()).map((post: BlogFile) => ({
    url: `https://codebycorey.com/blog/${post.metadata.slug}`,
    lastModified: post.metadata.date,
  }));

  const routes = ['', '/blog'].map((route) => ({
    url: `https://codebycorey.com${route}`,
  }));

  return [...blogPosts, ...routes];
}
