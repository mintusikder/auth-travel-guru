import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import PropTypes from 'prop-types'; 

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user login 
  const loginUser = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  //forget password 
  const resetPass = (email) =>{
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }
  // logOut 
  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }
  // google login 
  const googleLogin = () =>{
    setLoading(true)
    return signInWithPopup(auth,provider)
  }
  // state 
useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth, currentUser =>{
        setLoading(false)
        console.log("user",currentUser)
        setUser(currentUser)
    })
    return(() =>{
        unSubscribe()
    })
})

 
  const info = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    resetPass,
    googleLogin
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes={
    children: PropTypes.node
}