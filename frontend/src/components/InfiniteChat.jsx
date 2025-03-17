import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./infiniteChat.css";
const InfiniteChat = () => {
    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const chatContainerRef = useRef(null);
    const prevHeightRef = useRef(0);

    // Fetch older messages when scrolling up
    const fetchChats = async () => {
        if (!hasMore) return;

        try {
            const response = await fetch(`http://localhost:8089/chat?page=${page}`);
            const data = await response.json();

            // Store the previous height before adding new messages
            if (chatContainerRef.current) {
                prevHeightRef.current = chatContainerRef.current.scrollHeight;
            }

            setChats((prevChats) => [...data.chats, ...prevChats]); // Add old messages at the top
            setHasMore(data.chats.length > 0);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [page]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            if (page === 1) {
                // Scroll to bottom only on first load
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } else {
                // Preserve scroll position when older messages are loaded
                chatContainer.scrollTop = chatContainer.scrollHeight - prevHeightRef.current;
            }
        }
    }, [chats]);

    // Detect when user scrolls to the top
    const handleScroll = () => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer.scrollTop === 0 && hasMore) {
            setPage((prevPage) => prevPage + 1); // Load more messages
        }
    };

    return (
        <div className="chat-container mb-5 "
            ref={chatContainerRef}
            onScroll={handleScroll}
            style={{
                // height: "400px",
                overflowY: "auto",
            }}
        >
            {hasMore && <div  className=" flex-grow-1 p-3  rounded overflow-auto" style={{ textAlign: "center" }}>Loading more chats...</div>}

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
    );
};

export default InfiniteChat;
