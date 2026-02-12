import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useMemo, type ReactNode } from 'react';

interface ConvexClientProviderProps {
  children: ReactNode;
}

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  const convex = useMemo(
    () => new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL as string),
    []
  );

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
