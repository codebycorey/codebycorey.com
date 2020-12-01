import { FrontMatter } from '*.mdx';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Date from '@components/date';

interface BlogLinkProps {
  blog: FrontMatter;
}

const BlogLink: FC<BlogLinkProps> = ({ blog }) => {
  const { title, brief, date, readingTime, __resourcePath } = blog;
  const slug = __resourcePath.replace('blog/', '').replace('.mdx', '');

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-100 flex flex-col mb-16">
        <h3 className="text-4xl mb-4">{title}</h3>
        <p className="text-xl text-gray-700">{brief}</p>
        <div className="text-gray-500 flex justify-between mt-4">
          <Date dateString={date} />
          <span>{readingTime.text}</span>
        </div>
      </a>
    </Link>
  );
};

export default BlogLink;
