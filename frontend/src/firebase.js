import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_p03pliX2uEMhyOdqGUP03g0ouBX02XI",
  authDomain: "login-935ab.firebaseapp.com",
  projectId: "login-935ab",
  storageBucket: "login-935ab.appspot.com",
  messagingSenderId: "793210216149",
  appId: "1:793210216149:web:8b1791ba1fa8de31674c5c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);