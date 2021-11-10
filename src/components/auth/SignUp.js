import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSignUp = async () => {
    const postsCollectionRef = collection(db, "users");

    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      await addDoc(postsCollectionRef, {
        user: {
          displayName: name,
          email: email,
        },
      });
      history.push("/posts");
    } catch (err) {
      alert("Invalid Email");
    }
  };

  return (
    <div className="container">
      <div className="auth__container">
        <h3 className="auth__text">Sign up</h3>
        <label>Name</label>
        <input
          className="input"
          name="name"
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={handleSignUp} className="primary__btn">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
