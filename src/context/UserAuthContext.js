import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db} from "../firebase";
import { ref, set } from "firebase/database";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
  function signUp(auth, email, firstName, lastName, accNo, accType, password) {
   
    return createUserWithEmailAndPassword(auth, email, password, firstName, lastName, accNo, accType )
    .then(user => {
      set(ref(db, 'users/' + user.user.uid), {
        username: firstName + " " +lastName,
        accountNumber: accNo,
        accountType: accType,
        currentBalance: "5000£",
        email: email,
        id:  user.user.uid
      });
      });
    };

  function logOut() {
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      if(currentuser && currentuser.email) {
      localStorage.setItem('email', currentuser.email);
      }
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
