import Head from 'next/head';
import Link from 'next/link';

import NavBar from '@components/nav-bar';
import Footer from '@components/footer';

const name: string = "Corey O'Donnell";
export const siteTitle: string = "Corey O'Donnell";

interface Props {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props) {
  if (home) return <main>{children}</main>;

  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
