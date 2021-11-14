import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, doc, addDoc, query, orderBy } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Form } from "react-bootstrap";

import { UserContext } from "../../context/userContext";
import Post from "../Post";
import Comment from "../Comment";

function PostPage() {
  let { id } = useParams();
  const [user, setUser] = useContext(UserContext);

  const [addComment, setAddComment] = useState("");

  // Posts and Comments
  const postRef = doc(db, `posts`, `${id}`);
  const commentsRef = collection(db, `posts`, `${id}`, `comments`);

  const [post, loading, error] = useDocumentData(postRef, {
    idField: "id",
  });

  const [comments, commentsLoading, commentsError] = useCollectionData(
    query(commentsRef, orderBy("timestamp")),
    {
      idField: "id",
    }
  );

  const createComment = async () => {
    const createAt = new Date();
    await addDoc(commentsRef, {
      post_id: id,
      timestamp: createAt,
      content: addComment,
      user_id: user.uid,
      made_by: { user_email: user.email, user_name: user.displayName },
    });
    setAddComment("");
  };

  return (
    <div className="container">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="post__container">
          <h3>Loading...</h3>
        </div>
      )}

      {post && <Post {...post} />}
      {comments && (
        <div>
          {comments.map((comment) => {
            return <Comment key={comment.id} {...comment} />;
          })}
          <div className="comment__container">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Comment content"
              className="input__comment"
              onChange={(event) => {
                setAddComment(event.target.value);
              }}
              value={addComment}
            />
            <button className="pr__btn comment__btn" onClick={createComment}>
              add comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
