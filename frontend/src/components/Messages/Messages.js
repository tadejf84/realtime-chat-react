import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

// Import components
import Message from '../Message/Message';

// Import component styles
import './Messages.css';

const Messages = ({ messages, name }) => {

    return (
        <ScrollToBottom className="messages">
            {messages.map((message, index) => <div key={index}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    )
}

export default Messages;