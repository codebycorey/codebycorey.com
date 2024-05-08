import { getOrderedAndFilteredBlogPosts } from '@/lib/mdx';
import SearchInput from './SearchInput';
import { Metadata } from 'next';
import { BlogFile, OrderType } from '@/types/mdx.types';
import { fetchAllViewCounts } from '@/lib/supabase';
import { BlogListItem } from '@/components/BlogLink';

type BlogProps = {
  searchParams: {
    q: string;
  };
};

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'My blog posts of my thoughts and learns related to software engineering.',
  alternates: {
    canonical: `/blog`,
  },
};

export default async function Blog({ searchParams }: BlogProps) {
  const blogPosts = getOrderedAndFilteredBlogPosts({
    orderType: OrderType.DATE,
    query: searchParams?.q || '',
  });

  return (
    <section className="mx-auto max-w-2xl space-y-6 px-8 mt-4 md:mt-12">
      <h2 className="text-4xl">Blog Posts</h2>
      <SearchInput />
      <ul className="space-y-12">
        {blogPosts.map(({ metadata }: BlogFile) => (
          <li key={metadata.slug}>
            <BlogListItem metadata={metadata} />
          </li>
        ))}
      </ul>
    </section>
  );
}
