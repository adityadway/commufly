import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import property1Image from '../assets/images/Property 1=Variant4.png';
import asteriskImage from '../assets/images/Asterisk-PNG-Free-Image.png';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
