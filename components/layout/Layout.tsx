import NavBar from '@components/NavBar';
import Footer from '@components/layout/Footer';

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
