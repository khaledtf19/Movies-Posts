import React, { useState, useContext } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from "../../context/userContext";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import moreView from "../../img/moreView.png";

function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [update, setUpdate] = useState(false);

  const [posts, setPosts] = useState(null);
  const [postId, setPostId] = useState("");
  const [postUpdate, setPostUpdate] = useState("");

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

  const imgClick = (url) => {
    window.open(url, "_blank");
  };

  const handleUpdate = (id) => {
    setUpdate(true);
    setPostId(id);
    setShow(true);
  };
  const updateData = async () => {
    const docRef = doc(db, "posts", postId);
    const updatedPost = await updateDoc(docRef, {
      post_content: { content: postUpdate },
    });
    setShow(false);
  };

  const handleDelete = (id) => {
    setUpdate(false);
    setPostId(id);
    setShow(true);
  };
  const deleteData = async () => {
    const docRef = doc(db, "posts", postId);
    const deletePost = await deleteDoc(docRef);
    setShow(false);
  };

  return (
    <div className="container">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && (
        <div className="post__container">
          <h1>Loading...</h1>
        </div>
      )}

      {value && (
        <div>
          {value.map((post) => {
            return (
              <div key={post.id} className="post__container">
                <div className="post__userInfo">
                  <p className="post__email">{post.made_by.user_email}</p>
                  <p className="post__name">{post.made_by.user_name}</p>
                </div>
                <div className="post__content">
                  <p className="post__movieTitle">{post.movie_data.Title}</p>
                  <img
                    className="post__moviePoster"
                    src={post.movie_data.Poster}
                    alt={post.movie_data.Title}
                    onClick={() => imgClick(post.movie_data.Poster)}
                  />
                  <p>{post.post_content.content}</p>
                </div>
                {post.user_id === user?.uid ? (
                  <div className="div__dropdown">
                    <Dropdown className="post__button">
                      <Dropdown.Toggle
                        id="dropdown"
                        variant="secondary"
                        bsPrefix="test"
                      >
                        <img
                          src={moreView}
                          alt="moreView"
                          className="moreView"
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu id="dropdown__menu" variant="dark">
                        <Dropdown.Item
                          onClick={() => handleUpdate(post.id)}
                          id="dropdown__item"
                        >
                          Update
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => handleUpdate(post.id)}
                          id="dropdown__item"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      )}

      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {update ? <h3>Update</h3> : <h3>Delete</h3>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {update ? (
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) => {
                  setPostUpdate(event.target.value);
                }}
              />
            ) : (
              <h4>you want to delete this post ?</h4>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            {update ? (
              <Button onClick={updateData}>Update</Button>
            ) : (
              <Button onClick={deleteData}>Delete</Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Profile;
