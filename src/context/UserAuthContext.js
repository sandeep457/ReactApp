import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
  function signUp(email, firstName, lastName, accNo,password) {
    return createUserWithEmailAndPassword(auth, email, password, firstName, lastName, accNo )
    .then(user => {
      // addDoc(collection(db, "users"), {
      //   uid: user.user.uid,
      //   email: email,
      //   firstName: firstName,
      //   lastName: lastName,
      //   accountNumber: accNo
      // });
      var ref = new Firebase('https://reactauth-6f119-default-rtdb.firebaseio.com');
      ref.child('users').push({
        id: user.user.uid,
        email: email,
        username: firstName + " " +lastName,
        accountNumber: accNo,
        accountType: "Savings Account",
        currentBalance: "5000 £"
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
