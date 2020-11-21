import { FC, ReactNode } from 'react';
import { FrontMatter } from '../@types/mdx';

interface BlogLayoutProps {
  children: ReactNode;
  frontMatter: FrontMatter;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children, frontMatter }) => {
  const slug = frontMatter.__resourcePath.replace('blog/', '').replace('.mdx', '');
  console.log('SLUG', slug);

  return (
    <div className="flex justify-center">
      <article className="prose prose-xl">{children}</article>
    </div>
  );
};

export default BlogLayout;
