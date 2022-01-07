import { FC } from 'react';

import styles from './Sidebar.module.css';

interface Props {
  side?: 'left' | 'right';
  className?: string;
}

export const Sidebar: FC<Props> = ({
  children,
  side = 'left',
  className = '',
}) => {
  const sideStyle = side !== 'left' ? styles.right : styles.left;
  return (
    <div className={`${styles.sidebar} ${sideStyle} ${className}`}>
      {children}
    </div>
  );
};
