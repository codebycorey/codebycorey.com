import { BlogMetadata } from '@/types/mdx.types';
import Link from 'next/link';
import { FC, Suspense } from 'react';
import { BlogListItemViewCount } from './ViewCount';

type BlogListItemProps = {
  metadata: BlogMetadata;
};

export const BlogListItem: FC<BlogListItemProps> = ({
  metadata: { title, brief, formattedDate, slug },
}) => {
  return (
    <Link href={`/blog/${slug}`} className="space-y-3">
      <h3 className="text-2xl">{title}</h3>
      <p>{brief}</p>
      <div className="flex justify-between">
        <span className="text-zinc-500">{formattedDate}</span>
        <Suspense fallback={<p />}>
          <BlogListItemViewCount slug={slug} />
        </Suspense>
      </div>
    </Link>
  );
};
