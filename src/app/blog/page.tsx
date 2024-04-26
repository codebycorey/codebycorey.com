import { getOrderedAndFilteredBlogPosts } from '@/lib/mdx';
import { HomepageBlogLink } from '@/components/HomepageBlogLink';
import SearchInput from './SearchInput';
import { Metadata } from 'next';
import { BlogFile, OrderType } from '@/types/mdx.types';
import { fetchAllViewCounts } from '@/lib/supabase';

type BlogProps = {
  searchParams: {
    q: string;
  };
};

// revalidate page every hour for page view updates.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'My blog posts of my thoughts and learns related to software engineering.',
  alternates: {
    canonical: `/blog`,
  },
};

export default async function Blog({ searchParams }: BlogProps) {
  const blogPosts = await getOrderedAndFilteredBlogPosts({
    orderType: OrderType.DATE,
    query: searchParams?.q || '',
  });
  const viewCounts = await fetchAllViewCounts();

  return (
    <section className="mx-auto max-w-2xl space-y-6 px-8 mt-4 md:mt-12">
      <h2 className="text-4xl">Blog Posts</h2>
      <SearchInput />
      <ul className="space-y-12">
        {blogPosts.map(({ metadata }: BlogFile) => (
          <li key={metadata.slug}>
            <HomepageBlogLink
              metadata={metadata}
              count={viewCounts[metadata.slug]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
