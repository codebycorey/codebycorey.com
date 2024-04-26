import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Fathom from '@/components/Fathom';
const inter = Inter({ subsets: ['latin'] });

const title = "CodeByCorey - Corey O'Donnell";
const description = 'Software engineer, TypeScript enthusiast, and creator';

export const metadata: Metadata = {
  metadataBase: new URL('https://codebycorey.com'),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    site: title,
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={clsx(inter.className, 'min-h-screen flex flex-col')}>
        <main className="h-full flex grow flex-wrap justify-center max-w-5xl mx-auto sm:flex-col md:flex-row">
          <div className="grow px-8">
            <Sidebar />
          </div>
          <div className="basis-0 grow-[999] min-w-[50%]">{children}</div>
        </main>
        <Footer />
        <Fathom />
        <SpeedInsights />
      </body>
    </html>
  );
}
