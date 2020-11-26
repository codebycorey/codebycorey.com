import { FC, ReactNode } from 'react';
import { FrontMatter } from '../@types/*.mdx';
import Layout from '@components/layout';
import Image from 'next/image';

interface BlogLayoutProps {
  children: ReactNode;
  frontMatter: FrontMatter;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children, frontMatter }) => {
  const slug = frontMatter.__resourcePath.replace('blog/', '').replace('.mdx', '');
  console.log('SLUG', slug);

  return (
    <Layout>
      <article className="max-w-screen-lg flex flex-col justify-center items-center mx-auto">
        <header>
          {/* <Image src={`/static/images/${slug}/header.png`} width={1200} height={630} /> */}
          <h1 className="my-10 text-8xl w-full font-bold leading-snug">{frontMatter.title}</h1>
          <div className="w-full flex">
            <Image src={`/static/images/placeholder.jpg`} width={64} height={64} />
            <p></p>
          </div>
        </header>
        <div className="prose prose-2xl max-w-none">{children}</div>
      </article>
    </Layout>
  );
};

export default BlogLayout;
