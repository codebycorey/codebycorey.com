import { FrontMatter } from '*.mdx';
import { FC } from 'react';
import Image from 'next/image';

interface BlogLinkProps {
  blog: FrontMatter;
}

const BlogLink: FC<BlogLinkProps> = ({ blog }) => {
  console.log('BLOG', blog);

  // const slug = blog.__resourcePath.replace('blog/', '').replace('.mdx', '');

  return (
    <div className="w-100 flex my-10" key={blog.title}>
      <div className="w-4/6 pr-14">
        <h3 className="font-bold">{blog.title}</h3>
        <p>{blog.brief}</p>
      </div>
      <div className="w-2/6 relative">
        <Image src="/static/images/placeholder.jpg" objectFit="scale-down" layout="fill" />
      </div>
    </div>
  );
};

export default BlogLink;
