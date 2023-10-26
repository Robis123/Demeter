// AuthContext.tsx
import React from "react";

type Auth = {
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<Auth | null>(null);

export default AuthContext;
