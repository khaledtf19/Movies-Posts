import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import moreView from "../img/moreView.png";

import { UserContext } from "../context/userContext";

function Post(post) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [update, setUpdate] = useState(false);

  const [postId, setPostId] = useState("");
  const [postUpdate, setPostUpdate] = useState("");

  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  // Posts and Comments

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
    history.push("/posts");
  };

  return (
    <div className="container">
      {post && (
        <div key={post.id} className="post__container">
          <div className="post__userInfo">
            <p className="post__email">
              <Link
                to={{
                  pathname: "/id/" + post.user_id,
                  state: { fromDashboard: true },
                }}
              >
                {post.made_by.user_email}
              </Link>
            </p>
            <p className="post__name">{post.made_by.user_name}</p>
          </div>
          <div className="post__content">
            <h3 className="post__movieTitle">{post.movie_data.Title}</h3>
            <img
              className="post__moviePoster"
              src={post.movie_data.Poster}
              alt={post.movie_data.Title}
              onClick={() => imgClick(post.movie_data.Poster)}
            />
            <Link
              to={{
                pathname: `/posts/${post.id}`,
                state: { fromDashboard: true },
              }}
            >
              <p className="post__content__container">
                {post.post_content.content}
              </p>
            </Link>
          </div>
          {post.user_id === user?.uid ? (
            <div className="div__dropdown">
              <Dropdown className="post__button">
                <Dropdown.Toggle
                  id="dropdown"
                  variant="secondary"
                  bsPrefix="test"
                >
                  <img src={moreView} alt="moreView" className="moreView" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown__menu" variant="dark">
                  <Dropdown.Item
                    onClick={() => handleUpdate(post.id)}
                    className="dropdown__item"
                  >
                    Update
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => handleDelete(post.id)}
                    className="dropdown__item"
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
export default Post;
