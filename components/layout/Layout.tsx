import { ReactNode } from 'react';
import NavBar from '@components/NavBar';
import Footer from '@components/layout/Footer';

interface Props {
  children: ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props) {
  if (home) return <main>{children}</main>;

  return (
    <>
      <NavBar />
      <main className="bg-gray-100 dark:bg-gray-900">{children}</main>
      <Footer />
    </>
  );
}
