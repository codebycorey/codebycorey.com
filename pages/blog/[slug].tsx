import BlogLayout from '@components/blog/BlogLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@lib/mdx';
import { FC } from 'react';
import { MdxFile } from '@models/MdxFile';
import MdxComponents from '@components/mdx';

interface BlogPostProps extends MdxFile {}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const file: MdxFile = await getFileBySlug('blog', params?.slug as string);

  return { props: file };
};

const Blog: FC<BlogPostProps> = ({ mdxSource, frontMatter }) => {
  const content = hydrate(mdxSource, { components: MdxComponents });

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>;
};

export default Blog;
