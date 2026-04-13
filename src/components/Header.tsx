import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import property1Image from '../assets/images/Property 1=Variant4.png';
import asteriskImage from '../assets/images/Asterisk-PNG-Free-Image.png';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="header-banner">
        <div className="aristiik-logo">
          <img src={asteriskImage} alt="Aristiik Logo" className="aristiik-logo-img" />
        </div>

        {/* Mobile Hamburger Button */}
        <div id="menu-btn-container" className="mobile-only">
          <div id="menu-btn">
            <input 
              type="checkbox" 
              id="menu-checkbox" 
              checked={isMenuOpen} 
              onChange={toggleMenu} 
            />
            <label htmlFor="menu-checkbox" id="menu-label">
              <div id="menu-bar"></div>
            </label>
          </div>
        </div>

        <div className="rotating-image-container">
          <img src={property1Image} alt="Decorative rotating element" className="rotating-image" />
        </div>
        <h1 className="header-banner-text">Commufly</h1>
      </div>

      <nav className={`banner-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/projects" className="banner-nav-link" onClick={() => setIsMenuOpen(false)}>Projects</Link>
        <Link to="/about" className="banner-nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
        <a href="#footer" className="banner-nav-link" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}>Contacts</a>
      </nav>
    </div>
  );
};

export default Header;
