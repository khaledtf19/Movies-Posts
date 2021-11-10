import React, { createContext, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    currentUser ? setUser(currentUser) : setUser(null);
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
