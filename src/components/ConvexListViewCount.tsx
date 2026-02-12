import ConvexClientProvider from './ConvexClientProvider';
import { BlogListItemViewCount } from './ViewCount';

interface ConvexListViewCountProps {
  slug: string;
}

export default function ConvexListViewCount({
  slug,
}: ConvexListViewCountProps) {
  return (
    <ConvexClientProvider>
      <BlogListItemViewCount slug={slug} />
    </ConvexClientProvider>
  );
}
