import { BlogFile, OrderType, getOrderedAndFilteredBlogPosts } from '@/lib/mdx';
import { HomepageBlogLink } from '@/components/HomepageBlogLink';
import SearchInput from './SearchInput';

type BlogProps = {
  searchParams: {
    q: string;
  };
};

export default async function Blog({ searchParams }: BlogProps) {
  const blogPosts = await getOrderedAndFilteredBlogPosts({
    orderType: OrderType.DATE,
    query: searchParams?.q || '',
  });
  return (
    <section className="mx-auto max-w-xl space-y-12 mt-12">
      <h2 className="text-4xl font-bold">Blog Posts</h2>
      <SearchInput />
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