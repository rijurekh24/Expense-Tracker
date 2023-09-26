import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0uP6liT-bMfumVEgCD-doQqmZ5J2g-pQ",
  authDomain: "expense-tracker-db421.firebaseapp.com",
  projectId: "expense-tracker-db421",
  storageBucket: "expense-tracker-db421.appspot.com",
  messagingSenderId: "406182437244",
  appId: "1:406182437244:web:f8f2f87c80ccb09cc2c4f9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
