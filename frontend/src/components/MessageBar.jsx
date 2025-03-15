import React, { useState } from 'react';
import './MessageBar.css';

const MessageBar = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    return (
        <div className="message-bar d-flex justify-content-between">
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
            </form>
        </div>
    );
};

export default MessageBar;