import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { sequentialFuzzySearch } from '../lib/search';
import { format } from 'date-fns';
import ConvexClientProvider from './ConvexClientProvider';
import { BlogListItemViewCount } from './ViewCount';

interface PostData {
  id: string;
  title: string;
  brief: string;
  date: string;
  slug: string;
}

interface BlogSearchProps {
  posts: PostData[];
}

function BlogSearchInner({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [actionKey, setActionKey] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    setActionKey(isMac ? '\u2318K' : 'CtrlK');

    const handleKeyPress = (event: KeyboardEvent) => {
      const hotkey = isMac
        ? event.metaKey && event.key === 'k'
        : event.ctrlKey && event.key === 'k';

      if (hotkey && inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
  }, 300);

  const filteredPosts = query
    ? posts.filter((post) => sequentialFuzzySearch(query, post.title))
    : posts;

  return (
    <>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="search"
          id="search"
          className="peer block w-full border-0 px-0 py-3 text-xl focus:ring-0 sm:leading-6"
          placeholder="Search blog posts"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {actionKey && (
          <div className="absolute inset-y-0 right-0 flex py-3 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-zinc-300 px-1 font-sans text-xs text-zinc-400">
              {actionKey}
            </kbd>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 border-t border-zinc-300 peer-focus:border-t-2 peer-focus:border-zinc-500"
          aria-hidden="true"
        />
      </div>
      <ul className="space-y-12">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`} className="space-y-3 block">
              <h3 className="text-2xl">{post.title}</h3>
              <p>{post.brief}</p>
              <div className="flex justify-between">
                <span className="text-zinc-500">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </span>
                <BlogListItemViewCount slug={post.slug} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  return (
    <ConvexClientProvider>
      <BlogSearchInner posts={posts} />
    </ConvexClientProvider>
  );
}
