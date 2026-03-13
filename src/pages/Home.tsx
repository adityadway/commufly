import React from 'react';
import './Home.css';

// Import images from card 1 to card 22
import card1 from '../assets/images/stack/card 1.webp';
import card2 from '../assets/images/stack/card 2.webp';
import card3 from '../assets/images/stack/card 3.webp';
import card4 from '../assets/images/stack/card 4.webp';
import card5 from '../assets/images/stack/card 5.webp';
import card6 from '../assets/images/stack/card 6.webp';
import card7 from '../assets/images/stack/card 7.webp';
import card8 from '../assets/images/stack/card 8.webp';
import card9 from '../assets/images/stack/card 9.webp';
import card10 from '../assets/images/stack/card 10.webp';
import card11 from '../assets/images/stack/card 11.webp';
import card12 from '../assets/images/stack/card 12.webp';
import card13 from '../assets/images/stack/card 13.webp';
import card14 from '../assets/images/stack/card 14.webp';
import card15 from '../assets/images/stack/card 15.webp';
import card16 from '../assets/images/stack/card 16.png';
import card17 from '../assets/images/stack/card 17.png';
import card18 from '../assets/images/stack/card 18.png';
import card19 from '../assets/images/stack/card 19.png';
import card20 from '../assets/images/stack/card 20.png';
import card21 from '../assets/images/stack/card 21.png';
import card22 from '../assets/images/stack/card 22.png';

import arrowIcon from '../assets/images/arrow.svg';

interface HeroScrollProps {
  direction?: 'left' | 'right';
  images: string[];
  className?: string;
}

const HeroScroll: React.FC<HeroScrollProps> = ({ direction = 'right', images, className = '' }) => {
  // Duplicate images for infinite effect
  const displayImages = [...images, ...images];

  return (
    <div className={`hero-scroll-wrapper ${className}`}>
      <div className="hero-scroll-container">
        <div className={`hero-scroll-track scroll-${direction}`}>
          {displayImages.map((img, index) => (
            <div key={`${index}`} className="hero-scroll-card-img">
              <img src={img} alt={`Card ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const set1 = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11];
  const set2 = [card12, card13, card14, card15, card16, card17, card18, card19, card20, card21, card22];

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        {/* Top spacer to check background visibility */}
        <div style={{ height: '7vh', width: '100%' }}></div>
        <HeroScroll direction="right" images={set1} />
        <div style={{ height: '2vh', width: '100%' }}></div>
        <HeroScroll direction="left" images={set2} className="hero-scroll-bottom-left" />

        <div className="home-cta-wrapper">
          <button className="home-cta-btn" onClick={scrollToFooter}>
            <span>Connect with Us !</span>
            <div className="home-cta-icon-circle">
              <img src={arrowIcon} alt="arrow" className="home-cta-arrow" />
            </div>
          </button>
          <p className="home-cta-description">
            We build simple, <span className="text-grey">powerful</span> digital solutions that <br />
            help <span className="text-grey">communities</span> grow in the internet economy.
          </p>
        </div>
      </div>

      {/* Bottom spacer to check background visibility */}
      <div style={{ height: '200vh', width: '100%' }}></div>
      <div className="home-final-border"></div>
      {/* Other sections will go here */}
    </div>
  );
};

export default Home;
