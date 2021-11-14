import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Post from "../Post";

function ProfileById() {
  let { id } = useParams();

  const docRef = collection(db, "posts");
  const q = query(
    docRef,
    where("user_id", "==", id),
    orderBy("timestamp", "desc")
  );
  const [posts, loading, error] = useCollectionData(q, {
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

      {posts && (
        <div>
          {posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProfileById;
