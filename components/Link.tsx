import { AnchorHTMLAttributes, FC } from 'react';
import NextLink from 'next/link';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const Link: FC<LinkProps> = ({ children, external, href, ...props }) => {
  if (external) {
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href={href}
      {...props}
    >
      {children}
    </a>;
  }
  return (
    <NextLink href={href || ''}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
