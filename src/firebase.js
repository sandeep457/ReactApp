import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO56aNSDVDlHjRRXJa6OX7TlS1BtLklyc",
  authDomain: "reactauth-6f119.firebaseapp.com",
  databaseURL: "https://reactauth-6f119-default-rtdb.firebaseio.com",
  projectId: "reactauth-6f119",
  storageBucket: "reactauth-6f119.appspot.com",
  messagingSenderId: "211254039201",
  appId: "1:211254039201:web:d915939a6a4555cbe496e0",
  measurementId: "G-8MDSJ1KEQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
