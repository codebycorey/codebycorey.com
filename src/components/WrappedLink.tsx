import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';

const WrappedLink: FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ className, children, href, ...params }) => {
  const isInternalLink = href?.startsWith('/');
  const sharedClasses =
    'no-underline	inline-flex items-center gap-0.5 border-b-2 border-zinc-900 hover:text-zinc-600 m-0';
  const combinedClasses = `${sharedClasses}${className ? ` ${className}` : ''}`;

  if (isInternalLink) {
    return (
      <Link className={combinedClasses} href={href || ''}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={combinedClasses}
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...params}
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
