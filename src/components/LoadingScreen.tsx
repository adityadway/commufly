import React from 'react';
import './LoadingScreen.css';
import asteriskImg from '../assets/images/Asterisk-PNG-Free-Image.png';

interface LoadingScreenProps {
    phase: 'loading' | 'transitioning';
    isSubPage?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ phase, isSubPage = false }) => {
    return (
        <div className={`loading-screen ${phase} ${isSubPage ? 'no-travel' : ''}`}>
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
