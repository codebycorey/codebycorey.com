'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';

function stripUTMParams(searchParams: ReadonlyURLSearchParams) {
  const params = new URLSearchParams(searchParams);
  const utmParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmParams.forEach((param) => {
    if (params.has(param)) {
      params.delete(param);
    }
  });

  if (params.has('ref')) {
    params.delete('ref');
  }

  return params.toString();
}

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    load('ILBUCPDU', {
      includedDomains: ['codebycorey.com'],
      auto: false,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + stripUTMParams(searchParams),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
