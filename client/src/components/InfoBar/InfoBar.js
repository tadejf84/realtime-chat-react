import React from 'react';

// Import icons
import statusIcon from '../../icons/statusIcon.png';
import closeIcon from '../../icons/closeIcon.png';

// Import component styles
import './InfoBar.css';


const InfoBar = ({ room }) => {

    return (
        <div className="infoBar">
            <div className="infoBar__left">
                <img className="statusIcon" src={statusIcon} alt="Online" />
                <h3>{room}</h3>
            </div>
            <div className="infoBar__right">
                <a href="/"><img className="closeIcon" src={closeIcon} alt="Close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;