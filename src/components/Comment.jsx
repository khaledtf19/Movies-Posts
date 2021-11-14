import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import moreView from "../img/moreView.png";

import { UserContext } from "../context/userContext";

function Comment(comment) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [update, setUpdate] = useState(false);

  const [commentId, setCommentId] = useState("");
  const [postId, setPostId] = useState("");

  const [commentUpdate, setCommentUpdate] = useState("");

  const [user, setUser] = useContext(UserContext);

  const handleUpdate = (id, post_id) => {
    setUpdate(true);
    setCommentId(id);
    setPostId(post_id);

    setShow(true);
  };
  const updateData = async () => {
    const docRef = doc(db, "posts", postId, "comments", commentId);
    const updatedPost = await updateDoc(docRef, {
      content: commentUpdate,
    });
    setShow(false);
  };

  const handleDelete = (id, post_id) => {
    setUpdate(false);
    setCommentId(id);
    setPostId(post_id);
    setShow(true);
  };
  const deleteData = async () => {
    const docRef = doc(db, "posts", postId, "comments", commentId);
    const deletePost = await deleteDoc(docRef);
    setShow(false);
  };

  return (
    <div className="comment__container">
      <div className="comment__userInfo">
        <p className="comment__email">
          <Link
            to={{
              pathname: "/id/" + comment.user_id,
              state: { fromDashboard: true },
            }}
          >
            {comment.made_by.user_email}
          </Link>
        </p>
        <p className="comment__name">{comment.made_by.user_name}</p>
        {comment.user_id === user?.uid ? (
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
                  onClick={() => handleUpdate(comment.id, comment.post_id)}
                  className="dropdown__item"
                >
                  Update
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => handleDelete(comment.id, comment.post_id)}
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
      <div className="comment__content">
        <p className="comment">{comment.content}</p>
      </div>
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
                  setCommentUpdate(event.target.value);
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

export default Comment;
