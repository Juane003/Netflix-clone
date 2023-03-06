import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { app } from "./config";
import { db } from "./db";

export const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
  setDoc(doc(db, "users", email), {
    savedShows: [],
  });
};

export const signInUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
