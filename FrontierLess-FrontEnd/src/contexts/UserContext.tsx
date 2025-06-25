'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import iUser from '@/types/iUser';

interface Props {
  children: React.ReactNode;
}

interface UserContextType {
  user: iUser | null;
  setUser: (user: iUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<iUser | null>(null);

  // Carrega o user do localStorage depois que o componente montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Atualiza localStorage sempre que o user mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
