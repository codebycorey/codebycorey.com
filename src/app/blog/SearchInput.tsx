'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { FC, useEffect, useRef } from 'react';

// TODO: replace navigator.platform with non-deprecated method
const SearchInput: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let hotkey = false;
      if (navigator.platform.toLowerCase().startsWith('mac')) {
        hotkey = event.metaKey && event.key === 'k';
      } else {
        hotkey = event.ctrlKey && event.key === 'k';
      }

      if (hotkey && inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        name="search"
        id="search"
        className="peer block w-full border-0 px-0 py-3 text-xl focus:ring-0  sm:leading-6"
        placeholder="Search blog posts"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
      <div className="absolute inset-y-0 right-0 flex py-3 pr-1.5">
        <kbd className="inline-flex items-center rounded border border-zinc-300 px-1 font-sans text-xs text-zinc-400">
          {navigator.platform.toLowerCase().startsWith('mac') ? '⌘K' : 'CtrlK'}
        </kbd>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 border-t border-zinc-300 peer-focus:border-t-2 peer-focus:border-zinc-500"
        aria-hidden="true"
      />
    </div>
  );
};

export default SearchInput;
