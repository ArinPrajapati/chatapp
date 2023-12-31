import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup} from "firebase/auth";
import "../style/signIN.css"

export default function SignIN() {
    const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
 

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/main");
      
    } catch (error) {
      console.error(error);
    }
  };
   
  return (
    <div className="signin">
      <nav>Chat App</nav>
      <div >SIGN IN TO ENTER</div>
      <button onClick={signInWithGoogle}>Sign with Google</button>
     
    </div>
  );
}
