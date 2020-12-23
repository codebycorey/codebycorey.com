import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter, NextRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { DefaultSeo } from 'next-seo';

import '../styles/global.css';
import 'prism-themes/themes/prism-dracula.css';

import 'typeface-roboto';
import SEO from '../next-seo.config';
import { ThemeProvider } from '@hooks/use-theme';
import { AuthProvider } from '@hooks/use-auth';

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('ILBUCPDU', {
      url: 'https://ptarmigan.codebycorey.com/script.js',
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
  }, []);
  return (
    <AuthProvider>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
