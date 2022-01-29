import { FC } from 'react';
import Link from 'next/link';
import Date from '@components/Date';
import PageViews from '@components/PageViews';
import { MdxFrontMatter } from '@models/MdxFrontMatter';
import { Stack } from '@components/composition';

interface BlogLinkProps {
  blog: MdxFrontMatter;
}

const BlogLink: FC<BlogLinkProps> = ({ blog }) => {
  const { title, brief, date, readingTime, slug } = blog;

  return (
    <Link href={`/blog/${slug}`}>
      <a>
        <Stack style={{ '--space': 'var(--space-1)' }}>
          <h3>{title}</h3>
          <p>{brief}</p>
          <div className="blog-list">
            <Date dateString={date} />
            <div>
              disc
              <span>{readingTime.text}</span>
              {' / '}
              <PageViews slug={slug || ''} />
            </div>
          </div>
        </Stack>
      </a>
    </Link>
  );
};

export default BlogLink;
