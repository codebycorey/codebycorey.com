import { BlogMetadata } from '@/lib/mdx';
import Link from 'next/link';
import { FC } from 'react';

type HomepageBlogLinkProps = BlogMetadata;

export const HomepageBlogLink: FC<HomepageBlogLinkProps> = ({
  title,
  brief,
  slug,
}) => {
  return (
    <Link href={`/blog/${slug}`} className="space-y-3">
      <h3 className="text-2xl">{title}</h3>
      <p>{brief}</p>
    </Link>
  );
};
