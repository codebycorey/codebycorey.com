import { SidebarLink } from '@/components/SidebarLink';
import { BlogFile, getOrderedBlogPosts } from '../lib/mdx';
import { HomepageBlogLink } from '@/components/HomepageBlogLink';
import Image from 'next/image';

const sidebarLinks = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: 'https://github.com/CodeByCorey',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/CodeByCorey',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/horticoder',
    label: 'Twitter',
  },
];

export default async function Home() {
  const blogPosts = await getOrderedBlogPosts();
  console.log('post count', blogPosts.length);
  return (
    <main className="flex flex-wrap justify-center max-w-5xl mx-auto">
      <div className="grow-1 px-8">
        <div className="space-y-5 flex flex-col items-center mt-12 sticky top-12">
          <Image
            alt="profile"
            src="/static/images/profile.jpg"
            width="200"
            height="200"
            className="rounded-full mb-4"
          />
          <div className="space-y-5">
            <h1 className="text-4xl">{"Corey O'Donnell"}</h1>
            <h2 className="text-2xl">Software Engineer</h2>
            <nav>
              <ul className="space-y-2">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <SidebarLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="basis-0 grow-[999] min-w-[50%] px-8">
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
      </div>
    </main>
  );
}
