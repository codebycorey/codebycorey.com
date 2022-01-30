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
        <Stack className="stack-space-4">
          <h1>Blog</h1>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="search-bar focus:ring-gray-500 focus:border-gray-500 block w-full p-4 pr-10 text-xl border-gray-300 rounded-md"
              placeholder="Search Articles"
              onChange={(e) => setFilter(e.target.value)}
            />
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
