import React from "react";

import { db, auth, storage } from "../config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function MainPage() {
  const navigate = useNavigate();


  

  const [message, setMessage] = useState("");
  const user = auth?.currentUser?.displayName;

  const currentTime = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString("en-IN", options);
  useEffect(()=>{
    if (auth.currentUser === null) {
        return navigate("/");
      }
  },[])
  return (
    <div>
      {console.log(auth)}
      console.log(formattedDate)
      {}
      MainPage
    </div>
  );
}
