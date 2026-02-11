import ConvexClientProvider from './ConvexClientProvider';
import { BlogViewCount } from './ViewCount';

interface ConvexViewCountProps {
  slug: string;
}

export default function ConvexViewCount({ slug }: ConvexViewCountProps) {
  return (
    <ConvexClientProvider>
      <BlogViewCount slug={slug} />
    </ConvexClientProvider>
  );
}
