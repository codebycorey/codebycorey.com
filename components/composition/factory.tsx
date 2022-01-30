import { FC, HTMLAttributes } from 'react';
import { CompositionStyles } from './types/styles';

interface CompositionProps extends HTMLAttributes<HTMLDivElement> {
  style?: CompositionStyles;
}

export enum CompositionComponent {
  Center = 'center',
  Cover = 'cover',
  Icon = 'icon',
  Sidebar = 'sidebar',
  Split = 'split',
  Stack = 'stack',
  Switcher = 'switcher',
}

export function CompositionFactory<T>(component: CompositionComponent) {
  const Composition: FC<T & CompositionProps> = ({
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
  return Composition;
}
