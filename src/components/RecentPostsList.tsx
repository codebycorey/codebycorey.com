import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ConvexClientProvider from './ConvexClientProvider';

interface PostData {
  title: string;
  brief: string;
  date: string;
  slug: string;
}

interface RecentPostsListProps {
  posts: PostData[];
}

function RecentPostsListInner({ posts }: RecentPostsListProps) {
  const allCounts = useQuery(api.pages.getAllViewCounts);
  const countMap = allCounts
    ? new Map(allCounts.map((p) => [p.slug, p.viewCount]))
    : null;

  return (
    <ul className="space-y-8">
      {posts.map((post) => {
        const count = countMap?.get(post.slug) ?? 0;
        return (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="space-y-3 block">
              <h3 className="text-2xl">{post.title}</h3>
              <p>{post.brief}</p>
              <div className="flex justify-between">
                <time
                  className="text-zinc-500"
                  dateTime={new Date(post.date).toISOString()}
                >
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  }).format(new Date(post.date))}
                </time>
                {countMap && (
                  <p>
                    {count} view{count === 1 ? '' : 's'}
                  </p>
                )}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function RecentPostsList({ posts }: RecentPostsListProps) {
  return (
    <ConvexClientProvider>
      <RecentPostsListInner posts={posts} />
    </ConvexClientProvider>
  );
}
