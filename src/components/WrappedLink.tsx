import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

type WrappedLinkProps = PropsWithChildren<{
  className?: string;
  href: string;
}>;

const WrappedLink: FC<WrappedLinkProps> = ({ className, href, children }) => {
  const isInternalLink = href.startsWith('/');
  const sharedClasses =
    'flex items-center gap-1 underline underline-offset-8 hover:text-zinc-600';

  if (isInternalLink) {
    return (
      <Link className={`${sharedClasses} ${className}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={`${sharedClasses} ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      {children}
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
    </a>
  );
};

export default WrappedLink;
