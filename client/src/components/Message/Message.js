import React from 'react';
import ReactEmoji from 'react-emoji';

// Import component styles
import './Message.css';

const Message = ({ message: { user, text }, name }) => {

    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if( user === trimmedName ) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser 
        ? (
            <div className="singleMessage singleMessage--current">
                <p className="singleMessage__name">{trimmedName}</p>
                <div className="singleMessage__text">
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="singleMessage singleMessage--other">
                <div className="singleMessage__text">
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="singleMessage__name">{user}</p>
            </div>
        )
    )
}

export default Message;