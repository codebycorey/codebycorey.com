import { useState, createContext, useContext, useEffect } from 'react';
import { SupabaseClient } from '@lib/supabase-client';

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  // @todo use local storage
  const [session, setSession] = useState<any>(null);

  async function signIn() {
    const { error } = await SupabaseClient.auth.signIn({ provider: 'github' });
    console.log('ERROR', error);
  }

  async function signOut() {
    await SupabaseClient.auth.signOut();
  }

  useEffect(() => {
    setSession(SupabaseClient.auth.session());
    const { data } = SupabaseClient.auth.onAuthStateChange((event, supaSession) => setSession(supaSession));
    return () => data?.unsubscribe();
  }, []);

  const authContext = {
    session,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
