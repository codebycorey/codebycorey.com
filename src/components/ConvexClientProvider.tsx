import { ConvexProvider, ConvexReactClient } from 'convex/react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const ConvexReadyContext = createContext(false);

export function useConvexReady() {
  return useContext(ConvexReadyContext);
}

interface ConvexClientProviderProps {
  children: ReactNode;
}

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  const [convex, setConvex] = useState<ConvexReactClient | null>(null);

  useEffect(() => {
    const client = new ConvexReactClient(
      import.meta.env.PUBLIC_CONVEX_URL as string
    );
    setConvex(client);
    return () => client.close();
  }, []);

  if (!convex) {
    return (
      <ConvexReadyContext.Provider value={false}>
        {children}
      </ConvexReadyContext.Provider>
    );
  }

  return (
    <ConvexReadyContext.Provider value={true}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ConvexReadyContext.Provider>
  );
}
