import { createContext, useContext } from 'react';

interface AppContextType {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AppContext = createContext<AppContextType>({ addToast: () => {} });
export const useAppContext = () => useContext(AppContext);
