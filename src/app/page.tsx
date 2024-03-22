import { BlogFile, getOrderedBlogPosts } from '../lib/mdx';
import { HomepageBlogLink } from '@/components/HomepageBlogLink';
import Image from 'next/image';

export default async function Home() {
  const blogPosts = await getOrderedBlogPosts();
  console.log('post count', blogPosts.length);
  return (
    <section className="mx-auto max-w-xl space-y-12 mt-12">
      <h2 className="text-4xl font-bold">Recent Blog Posts</h2>
      <ul className="space-y-16">
        {blogPosts.map(({ metadata }: BlogFile) => (
          <li key={metadata.slug}>
            <HomepageBlogLink {...metadata} />
          </li>
        ))}
      </ul>
    </section>
  );
}
