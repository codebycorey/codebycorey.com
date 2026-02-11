import { useEffect, useState } from 'react';
import {
  fetchAndIncrementViewCount,
  fetchAllViewCounts,
} from '../lib/supabase';

interface ViewCountDisplayProps {
  count: number | null;
}

function ViewCountDisplay({ count }: ViewCountDisplayProps) {
  if (count === null) return null;
  return (
    <p>
      {count} view{count === 1 ? '' : 's'}
    </p>
  );
}

interface BlogViewCountProps {
  slug: string;
}

export function BlogViewCount({ slug }: BlogViewCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchAndIncrementViewCount(slug).then(setCount);
  }, [slug]);

  return <ViewCountDisplay count={count} />;
}

let viewCountsCache: Record<string, number> | null = null;
let viewCountsPromise: Promise<Record<string, number>> | null = null;

function getCachedViewCounts(): Promise<Record<string, number>> {
  if (viewCountsCache) return Promise.resolve(viewCountsCache);
  if (!viewCountsPromise) {
    viewCountsPromise = fetchAllViewCounts().then((counts) => {
      viewCountsCache = counts;
      return counts;
    });
  }
  return viewCountsPromise;
}

interface BlogListItemViewCountProps {
  slug: string;
}

export function BlogListItemViewCount({ slug }: BlogListItemViewCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getCachedViewCounts().then((counts) => {
      setCount(counts[slug] ?? 0);
    });
  }, [slug]);

  return <ViewCountDisplay count={count} />;
}
