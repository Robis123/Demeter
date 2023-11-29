import React from "react";

type User = {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
  // include other properties as needed
};

const UserContext = React.createContext<User | null>(null);

export default UserContext;