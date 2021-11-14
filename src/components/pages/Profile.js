import React, { useContext } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from "../../context/userContext";
import Post from "../Post";

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const docRef = collection(db, "posts");
  const q = query(
    docRef,
    where("user_id", "==", user.uid ? user.uid.toString() : "id"),
    orderBy("timestamp", "desc")
  );
  const [value, loading, error] = useCollectionData(q, {
    idField: "id",
  });

  return (
    <div className="container">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="post__container">
          <h3>Loading...</h3>
        </div>
      )}

      {value && (
        <div>
          {value.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
