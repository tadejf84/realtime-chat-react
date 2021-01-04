import React, { useState, useEffect } from 'react';

// Import component styles
import './Input.css';


const Input = ({ message, setMessage, sendMessage}) => {

    return (
        <form className="messageForm">
            <input 
            className="messageForm__input" 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={event => setMessage(event.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="messageForm__submit" onClick={event => sendMessage(event)}>Send</button>
        </form>
    )
}

export default Input;

