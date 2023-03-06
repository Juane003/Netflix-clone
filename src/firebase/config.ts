import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_Auth_Domain,
  projectId: import.meta.env.VITE_FIREBASE_Project_Id,
  storageBucket: import.meta.env.VITE_FIREBASE_Storage_Bucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_Messaging_Sender_Id,
  appId: import.meta.env.VITE_FIREBASE_App_Id,
};

export const app = initializeApp(firebaseConfig);
