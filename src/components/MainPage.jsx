import React from "react";

import { db, auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState([]);
  const user = auth?.currentUser?.displayName;
  const userEm = auth?.currentUser?.email;

  const currentTime = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString("en-IN", options);

  // get chat data

  const chatCollectionRef = collection(db, "chats");

  const getChatData = async () => {
    try {
      // const data = await getDocs(chatCollectionRef);
      // const filterData  = data.docs.map((doc) => ({
      //     ...doc.data(),
      //     id: doc.id,
      // }))
      // setAllChat(filterData);
      onSnapshot(chatCollectionRef, (data) => {
        const filterData = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        setAllChat(filterData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // on sent message

  const onSend = async () => {
    try {
      await addDoc(chatCollectionRef, {
        userMassage: message,
        userName: user,
        time: formattedDate,
        userEmail: userEm,
        timestamp: new Date(),
      });
      getChatData();
    } catch (error) {
      console.error(error);
    }
  };

  


  // return to sign in when refesh
  useEffect(() => {
    if (auth.currentUser === null) {
      return navigate("/");
    }
    getChatData();
  }, []);
  let youOrNot = false;

  return (
    <>
      <header>
        {formattedDate}
        {user}-{userEm}
        Chat
      </header>
      <div>
        {allChat?.map((chat) => (
          <div key={chat.id}>
            <p>
              <span>{chat.time}</span>
              <span>{chat.userMassage}</span>
              <span>{chat.userName}</span>
            </p>
            <span>{chat.userEmail}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="meassage...."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={onSend}>Send</button>
      </div>
    </>
  );
}
