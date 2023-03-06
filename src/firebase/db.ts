import { User } from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);

export const getMovieRef = (currentUser: User | null) => {
  if (!currentUser?.email) return;
  return doc(db, "users", currentUser.email);
};

export const onMovieSnapshot = (
  currentUser: User | null,
  callback: (doc: DocumentSnapshot<DocumentData>) => void
) => {
  if (!currentUser?.email) return;

  return onSnapshot(doc(db, "users", currentUser.email), callback);
};
