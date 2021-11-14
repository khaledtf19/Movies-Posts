import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementI,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = doc(db, `users`, `${user.uid}`);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    const { displayName, email, photoURL } = user;
    const createAt = new Date();
    try {
      await setDoc(userRef, {
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        createAt: createAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return;
  try {
    const userDocument = await getDoc(doc(collection(db, "users"), uid));
    // const userDocument = await db.collection("users").doc(uid).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.log(error.message);
  }
};
export default app;
