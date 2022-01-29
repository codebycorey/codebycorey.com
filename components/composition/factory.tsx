import { FC, HTMLAttributes } from 'react';
import { IntrinsicStyles } from './types/styles';

interface IntrinsicProps extends HTMLAttributes<HTMLDivElement> {
  style?: IntrinsicStyles;
}

export enum IntrinsicComponent {
  Center = 'center',
  Cover = 'cover',
  Icon = 'icon',
  Sidebar = 'sidebar',
  Split = 'split',
  Stack = 'stack',
  Switcher = 'switcher',
}

export function IntrinsicFactory<T>(component: IntrinsicComponent) {
  const intrinsic: FC<T & IntrinsicProps> = ({
    children,
    className,
    ...props
  }) => {
    const combined = [component, className].filter(Boolean).join(' ');
    return (
      <div className={combined} {...props}>
        {children}
      </div>
    );
  };
  return intrinsic;
}
