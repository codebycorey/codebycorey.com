import { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {};

export default function MarkdownLinks({ href, children }: Props) {
  if (href?.startsWith('http')) {
    return (
      <a href={href} rel="nofollow noreferrer noopener" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <a href={href} rel="nofollow noreferrer noopener">
      {children}
    </a>
  );
}
