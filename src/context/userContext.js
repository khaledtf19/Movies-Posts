import React, { createContext, useState } from "react";
import { auth, createUserProfileDocument } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, async (currentUser) => {
    currentUser ? setUser(currentUser) : setUser(null);
    const users = await createUserProfileDocument(currentUser);
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
