import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter, NextRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import '../styles/global.css';
import 'prism-themes/themes/prism-dracula.css';

import SEO from '../next-seo.config';
import { AuthProvider } from '@hooks/use-auth';

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('ILBUCPDU', {
      includedDomains: ['codebycorey.com']
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
