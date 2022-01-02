import { AnchorHTMLAttributes, FC } from 'react';
import NextLink from 'next/link';

const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const { children, href, ...otherProps } = props;
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a target="_blank" rel="nofollow noreferrer noopener" {...props}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href || ''}>
      <a {...otherProps}>{children}</a>
    </NextLink>
  );
};

export default Link;
