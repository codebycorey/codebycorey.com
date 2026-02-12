import { useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface ViewCountDisplayProps {
  count: number | null | undefined;
}

function ViewCountDisplay({ count }: ViewCountDisplayProps) {
  if (count === null || count === undefined) return null;
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
  const count = useQuery(api.pages.getViewCount, { slug });
  const incrementViewCount = useMutation(api.pages.incrementViewCount);

  useEffect(() => {
    incrementViewCount({ slug }).catch((err) => {
      console.error('[ViewCount] Failed to increment view count:', err);
    });
  }, [slug, incrementViewCount]);

  return <ViewCountDisplay count={count} />;
}

interface BlogListItemViewCountProps {
  slug: string;
}

export function BlogListItemViewCount({ slug }: BlogListItemViewCountProps) {
  const count = useQuery(api.pages.getViewCount, { slug });
  return <ViewCountDisplay count={count} />;
}
