import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// Import font awesome icons
import { faUser, faHashtag, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import component styles
import '../global.css';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [errors, setErrors] = useState([]);

    // Validate user input
    const validateUserInput = async (evt) => {
        evt.preventDefault();
        errors.length = 0;

        const joinUsername = document.getElementById('join-username').value;
        const joinPwd = document.getElementById('join-pwd').value;
        const joinRoom = document.getElementById('join-room').value;

        // Check if all data is entered
        if( !joinUsername || !joinPwd || !joinRoom ) 
        {
            setErrors(errors => ([
                ...errors, 'Please fill out all fields!'
            ]));  
            return;  
        } 

        // Fetch users from database
        const userData = await fetch("http://localhost:5000/usersData").then((res) => res.json());

        // Check if user exists in the database
        const userExists = userData.filter(user => user.username === joinUsername && user.pwd === joinPwd);

        // User does not exist
        if(userExists.length === 0) {
            setErrors([...errors, 'User does not exist!']);
            return;
        } 

        // Users exists - redirect to chat
        window.location.href = `/chat?name=${name}&room=${room}`;
    }

    return(
        <div className="container">

            <div className="join">
                <h1 className="join__heading">Realtime chat app</h1>
                <div className="input-group">
                    <label htmlFor="join-username">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <div>
                        <input type="text" placeholder="Username" className="join__input" id="join-username" onChange={ (event) => setName(event.target.value) } />
                        <div className="input-border-bottom"></div>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="join-pwd">
                        <FontAwesomeIcon icon={faKey} />
                    </label>
                    <div>
                        <input type="password" placeholder="Password" id="join-pwd" className="join__input" />
                        <div className="input-border-bottom"></div>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="join-room">
                        <FontAwesomeIcon icon={faHashtag} />
                    </label>
                    <div>
                        <input type="text" placeholder="Room" className="join__input" id="join-room" onChange={event => setRoom(event.target.value) } onKeyPress={event => event.key === 'Enter' ? validateUserInput(event) : null}/>
                        <div className="input-border-bottom"></div>
                    </div>
                </div>
                <button className="join__submit" type="submit" onClick={ event => validateUserInput(event)}>Start chatting</button>

                { errors.length > 0 && 
                    <div className="errors-holder">
                        { errors.map( (error, index) => 
                            <div className="erorr" key={index}>
                                {error}
                            </div>
                        ) }
                    </div>
                }

            </div>
        </div>
    )
};

export default Join;