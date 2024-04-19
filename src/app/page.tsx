import WrappedLink from '@/components/WrappedLink';
import { getOrderedBlogPosts } from '../lib/mdx';
import { HomepageBlogLink } from '@/components/HomepageBlogLink';
import { BlogFile } from '@/types/mdx.types';

export default async function Home() {
  const blogPosts = await getOrderedBlogPosts();
  return (
    <section className="mx-auto max-w-2xl space-y-12 mt-12 px-4">
      <div className="space-y-6">
        <h1 className="text-4xl">{`👋 Hi there, the names Corey`}</h1>
        <p className="text-lg">{`I'm a software engineer with a passion for frontend projects. I thrive on TypeScript, React.js, and Next.js, but I am not afraid to jump in to something new.`}</p>
        <p className="text-lg">
          When I am not coding, I am probably jotting down what I have learned
          or honing my baking skills with{' '}
          <WrappedLink href="https://flourandflorabaking.com">
            sourdough
          </WrappedLink>
          . Oh, and I am also a proud dad to two amazing kids.
        </p>
        <p className="text-lg">{`Lets connect and create something awesome!`}</p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-4xl">Recent Blog Posts</h2>
          <WrappedLink href="/blog" className="text-lg">
            view all
          </WrappedLink>
        </div>
        <ul className="space-y-8">
          {blogPosts.slice(0, 4).map(({ metadata }: BlogFile) => (
            <li key={metadata.slug}>
              <HomepageBlogLink {...metadata} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
