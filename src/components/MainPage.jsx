import React from "react";

import { db, auth } from "../config/firebase";
import { useState, useEffect,useRef } from "react";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
export default function MainPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState([]);
  const user = auth?.currentUser?.displayName;
  const userEm = auth?.currentUser?.email;
  // const chatArea = document.getElementById('chat-area');
  const chatArea = useRef(null);
  

  const currentTime = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString("en-IN", options);
  /// sroll 
  function scrollToBottom() {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    }
  }
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
          .sort((a, b) => a.timestamp - b.timestamp);
          
        setAllChat(filterData);
        
       
      });
    } catch (error) {
      console.log(error);
    }
  };


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

  useEffect(() => {
    scrollToBottom();
  }, [getChatData()]);
  
   
 
  return (
    <div className="mainPage">
      <header className="chat-header">
        <p id="date">{formattedDate}</p>
        
        <p id="user">
          {user} <span id="email">-{userEm}</span>
        </p>
      </header>
      <div className="message-area" id="chat-area" ref={chatArea}>
        {allChat?.map((chat) => (
          <div className="message-box"  key={chat.id}>
           
              <span className="userDetails">
                <span>{chat.userName}</span>
                <span id="userEmail">{chat.userEmail}</span>
              </span>
              <span className="message">{chat.userMassage}</span>
              <span className="time">{chat.time}</span>
           
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="meassage...."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  );
}
