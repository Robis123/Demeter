<<<<<<< HEAD
// AuthContext.tsx
import React from "react";

type Auth = {
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<Auth | null>(null);

export default AuthContext;
=======
// AuthContext.tsx
import React from "react";

type Auth = {
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<Auth | null>(null);

export default AuthContext;
>>>>>>> 686f5f2b3d9f3f4b5965717d9fafde7c48a7eb06
