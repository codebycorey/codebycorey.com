import { fetchAllViewCounts, fetchAndIncrementViewCount } from '@/lib/supabase';
import { FC, cache } from 'react';

type ViewCountProps = {
  count: number;
};
const ViewCount: FC<ViewCountProps> = async ({ count }) => {
  return (
    <p>
      {count} view{count === 1 ? '' : 's'}
    </p>
  );
};

type BlogViewCountProps = {
  slug: string;
};
export const BlogViewCount: FC<BlogViewCountProps> = async ({ slug }) => {
  const viewCount = await fetchAndIncrementViewCount(slug);
  const count = viewCount ?? 0;
  return <ViewCount count={count} />;
};

const cachedFetchAllViewCounts = cache(fetchAllViewCounts);

type BlogListItemViewCountProps = {
  slug: string;
};
export const BlogListItemViewCount: FC<BlogListItemViewCountProps> = async ({
  slug,
}) => {
  const viewCounts = await cachedFetchAllViewCounts();
  const count = viewCounts[slug] ?? 0;
  return <ViewCount count={count} />;
};
