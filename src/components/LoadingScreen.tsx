import React from 'react';
import './LoadingScreen.css';
import asteriskImg from '../assets/images/Asterisk-PNG-Free-Image.png';

interface LoadingScreenProps {
    phase: 'loading' | 'transitioning';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ phase }) => {
    return (
        <div className={`loading-screen ${phase}`}>
            <div className="loading-center">
                <img src={asteriskImg} alt="Loading Asterisk" className="asterisk-gear" />
            </div>
            <div className="loading-bottom-bar">
                <div className="loading-progress"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
