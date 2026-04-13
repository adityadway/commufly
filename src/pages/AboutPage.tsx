import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader';
import arrowIcon from '../assets/images/arrow.svg';
import arrowHomeIcon from '../assets/images/Arrow home.svg';
import aboutImage from '../assets/images/stack/card 2.webp';
import aboutImage2 from '../assets/images/stack/card 3.webp';
import collageImg1 from '../assets/images/stack/card 4.webp';
import collageImg2 from '../assets/images/stack/card 5.webp';
import collageImg3 from '../assets/images/stack/card 6.webp';
import collageImg4 from '../assets/images/stack/card 7.webp';
import collageImg5 from '../assets/images/stack/card 8.webp';
import collageImg6 from '../assets/images/stack/card 9.webp';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-container">
      <ProjectHeader title="ABOUT" />

      <main className="about-page-content">
        <div className="about-split-layout">
          <div className="about-image-section">
            <div className="about-image-block">
              <img src={aboutImage} alt="About Us" className="about-inner-image" />
            </div>
          </div>
          <div className="about-desc-section">
            <div className="about-desc-content">
              <h2 className="about-desc-title">ABOUT US</h2>
              <h3 className="about-desc-subtitle">Our Mission</h3>
              <p className="about-desc-text">
                We are a creative agency dedicated to transforming visions into reality. Our team combines innovative design with cutting-edge technology to build digital experiences that inspire and engage. From concept to execution, we believe in collaboration, transparency, and excellence, ensuring our clients achieve their goals with maximum impact.
              </p>
            </div>
          </div>
        </div>

        <div className="about-split-layout about-team-banner reverse">
          <div className="about-image-section">
            <div className="about-image-block">
              <img src={aboutImage2} alt="Team" className="about-inner-image" />
            </div>
          </div>
          <div className="about-desc-section">
            <div className="about-desc-content">
              <div className="about-team-strip">TAP ON TEAM MEMBER</div>
              <h2 className="about-desc-title">OUR VISION</h2>
              <h3 className="about-desc-subtitle">Looking Forward</h3>
              <p className="about-desc-text">
                We aim to redefine the boundaries of digital possibility. By continuously exploring emerging technologies and design trends, we empower brands to connect meaningfully in a rapidly evolving world. Our focus is on sustainable, scalable solutions that not only solve today's challenges but also anticipate tomorrow's opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="about-split-layout about-metrics-bar">
          <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1vw' }}>
            <div className="about-metric-number">50+</div>
            <div className="about-metric-label">
              <div style={{ display: 'block' }}>Clients</div>
              <div style={{ display: 'block' }}>Delivered</div>
            </div>
          </div>
          <div className="about-metrics-divider"></div>
          <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1vw' }}>
            <div className="about-metric-number">2x</div>
            <div className="about-metric-label">
              <div style={{ display: 'block' }}>Awwwards</div>
              <div style={{ display: 'block' }}>Winner</div>
            </div>
          </div>
          <div className="about-metrics-divider"></div>
          <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1vw' }}>
            <div className="about-metric-number">AI</div>
            <div className="about-metric-label">
              <div style={{ display: 'block' }}>Driven</div>
              <div style={{ display: 'block' }}>Automation</div>
            </div>
          </div>
        </div>

        <div className="about-split-layout about-collage-container">
          {/* Row 1: 3 columns */}
          <div className="about-collage-row">
            <div className="about-collage-item">
              <img src={collageImg1} alt="collage" className="about-collage-img" />
            </div>
            <div className="about-collage-item">
              <img src={collageImg2} alt="collage" className="about-collage-img" />
            </div>
            <div className="about-collage-item">
              <img src={collageImg3} alt="collage" className="about-collage-img" />
            </div>
          </div>
          {/* Row 2: 3 columns (now 6 images total) */}
          <div className="about-collage-row">
            <div className="about-collage-item">
              <img src={collageImg4} alt="collage" className="about-collage-img" />
            </div>
            <div className="about-collage-item">
              <img src={collageImg5} alt="collage" className="about-collage-img" />
            </div>
            <div className="about-collage-item">
              <img src={collageImg6} alt="collage" className="about-collage-img" />
            </div>
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="about-bottom-actions">
          <button className="about-action-btn about-home-btn" onClick={() => navigate('/')}>
            <div className="about-action-icon-circle">
              <img src={arrowHomeIcon} alt="arrow home" className="about-action-arrow" />
            </div>
            <span>HOME</span>
          </button>

          <a
            href="#footer"
            className="about-action-btn"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          >
            <span>Connect with Us !</span>
            <div className="about-action-icon-circle">
              <img src={arrowIcon} alt="arrow" className="about-action-arrow" />
            </div>
          </a>
        </div>
      </main>

      <div className="about-final-border"></div>
    </div>
  );
};

export default AboutPage;
