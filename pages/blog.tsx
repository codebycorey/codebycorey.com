import { FC, useState } from 'react';
import Layout from '@components/layout/Layout';
import BlogLink from '@components/blog/BlogLink';
import { NextSeo } from 'next-seo';
import { MdxFrontMatter } from '@models/MdxFrontMatter';
import { GetStaticProps } from 'next';
import { getAllFilesFrontMatter } from '@lib/mdx';

interface BlogProps {
  posts: MdxFrontMatter[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const files: MdxFrontMatter[] = await getAllFilesFrontMatter('blog');
  const posts = files.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  return { props: { posts } };
};

const BlogIndex: FC<BlogProps> = ({ posts }) => {
  const [filter, setFilter] = useState('');

  const filteredPosts = posts.filter((frontMatter) => frontMatter.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Layout>
      <NextSeo title="Blog - Corey O'Donnell" canonical="https://codebycorey.com/blog" />
      <div className="max-w-screen-lg mx-auto flex flex-col justify-center align-middle p-6">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500 text-8xl font-bold leading-snug">
          Blog
        </h1>
        {/* <p className="my-2 text-xl text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem veritatis earum, iure adipisci asperiores voluptatem ipsum doloribus
          odio doloremque beatae praesentium excepturi repudiandae neque fugit autem corporis laborum aut.
        </p> */}
        <div>
          <div className="my-8 relative rounded-md shadow-sm">
            <input
              type="text"
              id="account_number"
              className="focus:ring-gray-500 focus:border-gray-500 block w-full p-4 pr-10 text-xl border-gray-300 rounded-md"
              placeholder="Search Articles"
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-6xl my-12 font-bold dark:text-gray-100">All Posts</h2>
        {filteredPosts.map((post) => (
          <BlogLink key={post.title} blog={post} />
        ))}
      </div>
    </Layout>
  );
};

export default BlogIndex;
