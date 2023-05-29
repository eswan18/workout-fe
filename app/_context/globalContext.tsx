'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import getCurrentUser from '@/app/_actions/getCurrentUser';

interface ContextProps {
  user: string | undefined;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  user: undefined,
  setUser: (): string | undefined => '',
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  
  const updateCurrentUser = async () => {
    console.log("updating current user");
    setLoading(true);
    const currentUser = await getCurrentUser();
    console.log("got current user");
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }

  useEffect(() => {
    // On initial load, ask the server for the current user.
    updateCurrentUser();
  }, []);

  const logSetUser = (user: string | undefined) => { console.log("setUser here", user); setUser(user); }

  return (
    <GlobalContext.Provider value={{ user, setUser: logSetUser, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);