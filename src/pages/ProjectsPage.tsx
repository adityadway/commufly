import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader';
import arrowBlue from '../assets/images/Arrow blue.svg';
import arrowIcon from '../assets/images/arrow.svg';
import arrowHomeIcon from '../assets/images/Arrow home.svg';
import card1 from '../assets/images/stack/card 14.webp';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [animLeft, setAnimLeft] = useState(false);
  const [animRight, setAnimRight] = useState(false);

  const handleLeftClick = () => {
    setAnimLeft(true);
    setTimeout(() => setAnimLeft(false), 500);
  };

  const handleRightClick = () => {
    setAnimRight(true);
    setTimeout(() => setAnimRight(false), 500);
  };

  return (
    <div className="projects-page-container">
      <ProjectHeader />

      <main className="projects-page-content">
        <div className="project-split-layout">

          {/* Left Cutout Button */}
          <button
            className={`project-cutout-btn btn-left ${animLeft ? 'animate-click-left' : ''}`}
            onClick={handleLeftClick}
          >
            <div className="cutout-arrow-wrapper">
              <img src={arrowBlue} alt="Arrow Left" />
            </div>
          </button>

          {/* Right Cutout Button */}
          <button
            className={`project-cutout-btn btn-right ${animRight ? 'animate-click-right' : ''}`}
            onClick={handleRightClick}
          >
            <div className="cutout-arrow-wrapper">
              <img src={arrowBlue} alt="Arrow Right" />
            </div>
          </button>

          <div className="project-image-section">
            <div className="project-image-block">
              <img src={card1} alt="Project Showcase" className="project-inner-image" />
            </div>
          </div>
          <div className="project-desc-section">
            <div className="project-desc-content">
              <h2 className="project-desc-title">NEXUS PLATFORM</h2>
              <h3 className="project-desc-subtitle">UI / UX Design</h3>
              <p className="project-desc-text">
                A comprehensive digital ecosystem tailored for modern enterprises. We focused on seamless data visualization and intuitive workflow management for global teams. This platform seamlessly bridges the gap between complex analytics and accessible, user-friendly interfaces, ensuring that every stakeholder can make informed decisions quickly and confidently.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="project-bottom-actions">
          <button className="project-action-btn project-home-btn" onClick={() => navigate('/')}>
            <div className="project-action-icon-circle">
              <img src={arrowHomeIcon} alt="arrow home" className="project-action-arrow" />
            </div>
            <span>HOME</span>
          </button>

          <a 
            href="#footer" 
            className="project-action-btn"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          >
            <span>Connect with Us !</span>
            <div className="project-action-icon-circle">
              <img src={arrowIcon} alt="arrow" className="project-action-arrow" />
            </div>
          </a>
        </div>
      </main>

      <div className="projects-final-border"></div>
      {/* Footer is handled globally in App.tsx or can be added here if needed to match Reveal effect */}
    </div>
  );
};

export default ProjectsPage;
