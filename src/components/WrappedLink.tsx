import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { clsx } from 'clsx';

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  hideDecorations?: boolean;
};

const WrappedLink: FC<LinkProps> = ({
  className,
  children,
  href,
  hideDecorations,
  ...params
}) => {
  const isInternalLink = href?.startsWith('/');
  const sharedClasses =
    'no-underline	inline-flex items-center gap-0.5 m-0 hover:text-zinc-600';
  const decorationStyles = 'border-b-2 border-zinc-900';

  if (isInternalLink) {
    return (
      <Link
        className={clsx(
          sharedClasses,
          !hideDecorations && decorationStyles,
          className
        )}
        href={href || ''}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      className={clsx(
        sharedClasses,
        !hideDecorations && decorationStyles,
        className
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...params}
    >
      {children}
      {!hideDecorations && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      )}
    </a>
  );
};

export default WrappedLink;
