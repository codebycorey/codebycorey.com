import { FC, useState } from 'react';
import Layout from '@components/layout/Layout';
import BlogLink from '@components/blog/BlogLink';
import { NextSeo } from 'next-seo';
import { MdxFrontMatter } from '@models/MdxFrontMatter';
import { GetStaticProps } from 'next';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { Center, Stack } from '@components/composition';

interface BlogProps {
  posts: MdxFrontMatter[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const files: MdxFrontMatter[] = await getAllFilesFrontMatter('blog');
  const posts = files.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return { props: { posts } };
};

const BlogIndex: FC<BlogProps> = ({ posts }) => {
  const [filter, setFilter] = useState('');

  const filteredPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <NextSeo
        title="Blog - Corey O'Donnell"
        canonical="https://codebycorey.com/blog"
      />
      <Center>
        <Stack style={{ '--space': 'var(--s4)' }}>
          <h1>Blog</h1>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="search-bar focus:ring-gray-500 focus:border-gray-500 block w-full p-4 pr-10 text-xl border-gray-300 rounded-md"
              placeholder="Search Articles"
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className=" text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="0.75em"
                height="0.75em"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <h2>All Posts</h2>
          {filteredPosts.map((post) => (
            <BlogLink key={post.title} blog={post} />
          ))}
        </Stack>
      </Center>
    </Layout>
  );
};

export default BlogIndex;
