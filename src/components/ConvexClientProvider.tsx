import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useMemo, type ReactNode } from 'react';

interface ConvexClientProviderProps {
  children: ReactNode;
}

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  const url = import.meta.env.PUBLIC_CONVEX_URL;

  const convex = useMemo(() => {
    if (!url) return null;
    return new ConvexReactClient(url);
  }, []);

  if (!convex) return <>{children}</>;

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
