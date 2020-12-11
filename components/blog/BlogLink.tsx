import { FrontMatter } from '*.mdx';
import { FC } from 'react';
import Link from 'next/link';
import Date from '@components/Date';
import PageViews from '@components/PageViews';
import { MdxFrontMatter } from '@models/MdxFrontMatter';

interface BlogLinkProps {
  blog: MdxFrontMatter;
}

const BlogLink: FC<BlogLinkProps> = ({ blog }) => {
  const { title, brief, date, readingTime, slug } = blog;

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-100 flex flex-col mb-16">
        <h3 className="text-4xl mb-4">{title}</h3>
        <p className="text-xl text-gray-700">{brief}</p>
        <div className="text-gray-500 flex justify-between mt-4">
          <Date dateString={date} />
          <div>
            <span>{readingTime.text}</span>
            {' / '}
            <PageViews slug={slug || ''} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogLink;
