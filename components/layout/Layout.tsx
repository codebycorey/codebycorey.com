import { ReactNode } from 'react';
import NavBar from '@components/NavBar';
import Footer from '@components/layout/Footer';

interface Props {
  children: ReactNode;
}

/**
 * @todo Layout Probably is not needed. Each route would cause a rerender since they
 * are different. Meaning Layout would be unnecessary.
 * @returns
 */
export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
