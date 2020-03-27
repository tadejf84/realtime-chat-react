import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="container">
            <div className="join">
                <h1 className="join__heading">Join</h1>
                <div>
                    <input type="text" placeholder="" className="join__input" onChange={ (event) => setName(event.target.value) } />
                </div>
                <div>
                    <input type="text" placeholder="" className="join__input" onChange={ (event) => setRoom(event.target.value) } />
                </div>
                <Link onClick={ event => (!name || !room) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                    <button className="join__submit" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
};

export default Join;