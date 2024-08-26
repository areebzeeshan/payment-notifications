import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredentials.user.getIdToken();
    return { user: userCredentials.user, token: token };
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const user = newUser.user;
    const res = await addDoc(collection(database, "users"), {
      uid: user.uid,
      username,
      authProvider: "local",
      email,
    });
    return res;
  } catch (error) {
    console.log("Error in Signing Up : ", error.message);
  }
};

const logout = () => {
  const res = signOut(auth);
  return res ? true : false;
};

export {
  database,
  auth,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
