import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      history.push("/posts");
    } catch (error) {
      alert("Invalid email or password");
    }
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="container">
      <div className="auth__container">
        <h3 className="auth__text">Login</h3>
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
        <button onClick={login} className="pr__btn">
          Login
        </button>
        <button onClick={signInWithGoogle} className="pr__btn">
          Login with google
        </button>
        <div>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
