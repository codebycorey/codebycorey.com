import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter, NextRouter } from 'next/router';
import * as Fathom from 'fathom-client';

import '../styles/global.css';

const FATHOM_TRACKING: string | null = process.env.FATHOM || null;
console.log('FATHOM_TRACKING', process.env.FATHOM);
export default function App({ Component, pageProps }: AppProps) {

  const router: NextRouter = useRouter();

  useEffect(() => {

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    console.log('code', FATHOM_TRACKING);
    if (FATHOM_TRACKING) {
      // Initialize Fathom when the app loads
      Fathom.load(FATHOM_TRACKING, {
        includedDomains: ['https://coreyodonnell.dev']
      });

      // Record a pageview when route changes
      router.events.on('routeChangeComplete', onRouteChangeComplete);

      // Unassign event listener
      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete);
      };

    }
  });
  return <Component {...pageProps} />
}
