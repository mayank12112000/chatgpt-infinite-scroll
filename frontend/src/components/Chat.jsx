import React, { useEffect, useRef, useState } from "react";
import data from "../longdata.json";
// import data from "../data/data.json";

import { marked } from "marked";
import "./chat.css";

const Chat = () => {
  const chatBoxRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Extract chat messages
  const chat = Object.values(data.mapping);
  console.log(typeof(chat))
  const allChats = chat.map((chat) => ({
    sender: chat.message?.author?.role,
    message: typeof chat.message?.content?.parts?.[0] === "string" 
      ? chat.message?.content?.parts?.[0] 
      : JSON.stringify(chat.message?.content?.parts?.[0]) || "", // Convert objects to string safely
  }));
  
  const chats = allChats.filter((chat) => chat.message);

  console.log(chats);

  // Function to check scroll position
  const checkScrollPosition = () => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;

    const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 1;
    setIsScrolled(!isAtBottom);
  };

  // Scroll event listener
  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;

    chatBox.addEventListener("scroll", checkScrollPosition);

    // Check position on initial load
    checkScrollPosition();

    return () => chatBox.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // Smooth scroll to bottom function
  const scrollToBottom = () => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;
    
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="chat-container d-flex flex-column">
      <div ref={chatBoxRef} className="chat-box flex-grow-1 p-3  rounded overflow-auto">
        {chats.map((chat, index) =>
          chat.sender === "user" ? (
            <div key={index} className="mb-3 message my-2 p-2 rounded user-chat align-self-end">
              {chat?.message}
            </div>
          ) : (
            <div
              key={index}
              className="message mb-3 my-2 p-2 rounded assistant-chat align-self-start"
              dangerouslySetInnerHTML={{ __html: marked(chat?.message || "") }}
            ></div>
          )
        )}
      </div>

      {/* Scroll to bottom button (only visible when user scrolls up) */}
      {isScrolled && (
        <div className="down-button" onClick={scrollToBottom}>
          ▼
        </div>
      )}
    </div>
  );
};

export default Chat;
