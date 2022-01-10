import { FC } from 'react';

import styles from './Stack.module.css';

interface StackProps {
  className?: string;
}

export const Stack: FC<StackProps> = ({ children, className = '' }) => {
  return <div className={`${styles.stack} ${className}`}>{children}</div>;
};
