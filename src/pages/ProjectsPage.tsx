import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader';
import arrowBlue from '../assets/images/Arrow blue.svg';
import arrowIcon from '../assets/images/arrow.svg';
import arrowHomeIcon from '../assets/images/Arrow home.svg';
import card1 from '../assets/images/stack/card 14.webp';
import card13 from '../assets/images/stack/card 13.webp';
import card11 from '../assets/images/stack/card 11.webp';
import card6 from '../assets/images/stack/card 6.webp';
import card3 from '../assets/images/stack/card 3.webp';
import './ProjectsPage.css';

const projects = [
  {
    title: "NEXUS PLATFORM",
    subtitle: "UI / UX Design",
    description: "A comprehensive digital ecosystem tailored for modern enterprises. We focused on seamless data visualization and intuitive workflow management for global teams. This platform seamlessly bridges the gap between complex analytics and accessible, user-friendly interfaces, ensuring that every stakeholder can make informed decisions quickly and confidently.",
    image: card1
  },
  {
    title: "AURA BLOCKCHAIN",
    subtitle: "Web3 Ecosystem",
    description: "Securing decentralized futures with gorgeous and fluid visual experiences. Aura features high-throughput transaction telemetry and fully responsive, glassmorphic analytics widgets. It reinvents user trust by introducing elegant cryptographic signature walk-throughs and frictionless wallet integrations built for high-scale dApps.",
    image: card13
  },
  {
    title: "VORTEX ANALYTICS",
    subtitle: "Business Intelligence",
    description: "Vortex bridges complex data pipelines into elegant dashboard systems. We crafted a custom HSL-tailored dynamic design that highlights mission-critical metrics with high contrast and real-time visual charts. Perfected with lightweight loading states and snappy interaction rates, designed for executive decision-makers globally.",
    image: card11
  },
  {
    title: "QUANTUM CLOUD",
    subtitle: "Developer Tools",
    description: "Empowering developers to scale applications to the absolute limits of edge computing. Quantum Cloud features a beautifully dark theme with rich glassmorphic details and vibrant cyber-blue accent lines. Highly custom terminal emulators and interactive deployment graphs respond instantly to user drag and drop inputs.",
    image: card6
  },
  {
    title: "LUMEN WELLNESS",
    subtitle: "Healthcare Application",
    description: "Lumen redefines health tracking with premium visual hierarchy and a relaxing, mindful design palette. Utilizing organic gradients, soft shadows, and delightful macro-animations, Lumen guides users along their daily routines with positive feedback loops and intuitive progress summaries.",
    image: card3
  }
];

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [animLeft, setAnimLeft] = useState(false);
  const [animRight, setAnimRight] = useState(false);

  const handleLeftClick = () => {
    setAnimLeft(true);
    setCurrentProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setAnimLeft(false), 500);
  };

  const handleRightClick = () => {
    setAnimRight(true);
    setCurrentProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setAnimRight(false), 500);
  };

  const project = projects[currentProjectIndex];

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
              <img 
                key={`img-${currentProjectIndex}`} 
                src={project.image} 
                alt={project.title} 
                className="project-inner-image animate-image-reveal" 
              />
            </div>
          </div>
          <div className="project-desc-section">
            <div className="project-desc-content">
              <h2 key={`title-${currentProjectIndex}`} className="project-desc-title animate-fade-in-up-1">
                {project.title}
              </h2>
              <h3 key={`sub-${currentProjectIndex}`} className="project-desc-subtitle animate-fade-in-up-2">
                {project.subtitle}
              </h3>
              <p key={`text-${currentProjectIndex}`} className="project-desc-text animate-fade-in-up-3">
                {project.description}
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
