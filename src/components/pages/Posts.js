import React, { useContext } from "react";
import Post from "../Post";

import { PostsContext } from "../../context/postsContext";

function Profile() {
  const [posts, loading, error] = useContext(PostsContext);

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

export default Profile;
