import React from "react";

type User = {
  displayName: string;
  photoURL: string;
  // include other properties as needed
};

const UserContext = React.createContext<User | null>(null);

export default UserContext;