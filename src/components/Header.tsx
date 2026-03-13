import React from 'react';
import { Link } from 'react-router-dom';
import property1Image from '../assets/images/Property 1=Variant4.png';
import asteriskImage from '../assets/images/Asterisk-PNG-Free-Image.png';
import './Header.css';

const Header: React.FC = () => {
  return (
    <>
      <div className="header-banner">
        <div className="aristiik-logo">
          <img src={asteriskImage} alt="Aristiik Logo" className="aristiik-logo-img" />
        </div>

        <nav className="banner-nav">
          <Link to="/projects" className="banner-nav-link">Projects</Link>
          <Link to="/about" className="banner-nav-link">About</Link>
          <Link to="/contacts" className="banner-nav-link">Contacts</Link>
        </nav>

        <div className="rotating-image-container">
          <img src={property1Image} alt="Decorative rotating element" className="rotating-image" />
        </div>
        <h1 className="header-banner-text">Commufly</h1>
      </div>
    </>
  );
};

export default Header;
