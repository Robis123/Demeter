
import { createContext, useContext, useState } from 'react';

const LastUrlContext = createContext(null);

export const LastUrlProvider = ({ children }) => {
  const [lastUrl, setLastUrl] = useState(null);

  const setLastUrlValue = (url) => {
    setLastUrl(url);
  };

  return (
    <LastUrlContext.Provider value={{ lastUrl, setLastUrlValue }}>
      {children}
    </LastUrlContext.Provider>
  );
};

export const useLastUrl = () => {
  return useContext(LastUrlContext);
};