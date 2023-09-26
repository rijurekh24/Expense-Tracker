import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import "./Auth.css";
const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page text-center">
      <h2>Welcome! to</h2>
      <h1 className="mb-5 pb-5">Expense Tracker App</h1>
      {/* <p>Sign in With Google to Continue</p> */}
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in With Google
      </button>
    </div>
  );
};

export default Auth;
