import React, { createContext } from "react";
import { db } from "../firebase-config";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const PostsContext = createContext();

export const PostsProvider = (props) => {
  const [posts, loading, error] = useCollectionData(
    query(collection(db, "posts"), orderBy("timestamp", "desc")),
    {
      idField: "id",
    }
  );

  return (
    <PostsContext.Provider value={[posts, loading, error]}>
      {props.children}
    </PostsContext.Provider>
  );
};
