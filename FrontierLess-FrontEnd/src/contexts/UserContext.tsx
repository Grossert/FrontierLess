'use client';

import { createContext, useContext, useState } from 'react';
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
