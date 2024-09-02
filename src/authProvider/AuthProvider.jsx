import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import PropTypes from 'prop-types'; 
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
  // logOut 
  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
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
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes={
    children: PropTypes.node
}