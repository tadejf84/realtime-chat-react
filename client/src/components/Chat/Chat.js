import React, { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

// Import font awesome icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import all components
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

// Import component styles
import './Chat.css';

let socket;
const Chat = ( { location } ) => {

    const [name, setName] = useState(''); // state for user name
    const [room, setRoom] = useState(''); // state for room
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); // state for current message
    const [messages, setMessages] = useState([]); // state for all messages - store in array
    const ENDPOINT = 'localhost:5000';

    // Handling join event
    useEffect(() => {

        // Get name and room data from query string upon join
        const { name, room } = queryString.parse(location.search);

        // Create a connection on endpoint
        socket = io(ENDPOINT);

        // Set state for user name and room
        setName(name);
        setRoom(room);

        // User joined room, emit data to server
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
        });

    }, [ENDPOINT, location.search]);

    // Handle user messages

    useEffect(() => {
        // Listen for messages
        socket.on('message', (message) => {
            // Push the last message to the messages array
            setMessages([...messages, message]);
        });

        // List active users in room
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    // Function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        // If message, send message to the server
        // When done, clear message
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="container">
            <div className="chatroom">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;