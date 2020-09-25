import Head from 'next/head';
import Link from 'next/link';

const name: string = 'Corey O\'Donnell';
export const siteTitle: string = 'Corey O\'Donnell';

interface Props {
    children: React.ReactNode,
    home?: boolean;
}

export default function Layout({ children, home }: Props) {
    return (
      <>
        <Head>
          <title>{siteTitle}</title>
          <meta name="title" content="Corey O'Donnell | Full-Stack Web Developer" />
          <meta
            name="description"
            content="My name is Corey O'Donnell and I am a full-stack web development. The tech stack I primarily work with is TypeScript, React.js, Node.js, and Python."
          />
          <meta property="og:title" content="Corey O'Donnell | Full-Stack Web Developer" />
          <meta
            property="og:description"
            content="My name is Corey O'Donnell and I am a full-stack web development. The tech stack I primarily work with is TypeScript, React.js, Node.js, and Python."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@CodeByCorey" />
          <meta property="og:image" content="https://coreyodonnell.tech/og/website_og.png" />
        </Head>
        <main>{children}</main>
      </>
    );
}
