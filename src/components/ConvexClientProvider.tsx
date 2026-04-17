import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useEffect, useState, type ReactNode } from 'react';

let clientSingleton: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient {
  if (!clientSingleton) {
    clientSingleton = new ConvexReactClient(
      import.meta.env.PUBLIC_CONVEX_URL as string
    );
  }
  return clientSingleton;
}

interface ConvexClientProviderProps {
  children: ReactNode;
}

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ConvexProvider client={getConvexClient()}>{children}</ConvexProvider>;
}
