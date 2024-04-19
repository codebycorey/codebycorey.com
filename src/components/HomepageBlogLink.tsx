import { BlogMetadata } from '@/types/mdx.types';
import Link from 'next/link';
import { FC } from 'react';

type HomepageBlogLinkProps = {
  metadata: BlogMetadata;
  count?: number;
};

export const HomepageBlogLink: FC<HomepageBlogLinkProps> = ({
  metadata: { title, brief, formattedDate, slug },
  count,
}) => {
  return (
    <Link href={`/blog/${slug}`} className="space-y-3">
      <h3 className="text-2xl">{title}</h3>
      <p>{brief}</p>
      <div className="flex justify-between">
        <span className="text-zinc-500">{formattedDate}</span>
        {count && (
          <span className="text-zinc-500">
            {count} view{(count ?? 0) > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Link>
  );
};
