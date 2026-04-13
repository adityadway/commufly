import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DefaultPage.css';
import '../pages/ProjectsPage.css';
import asteriskImage from '../assets/images/Asterisk-PNG-Free-Image.png';
import arrowHomeIcon from '../assets/images/Arrow home.svg';

export type PageType = '404' | 'career' | 'legal';

interface DefaultPageProps {
  type: PageType;
  title: string;
}

const DefaultPage: React.FC<DefaultPageProps> = ({ type, title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case '404':
        return (
          <div className="dp-404-container">
            <h1 className="dp-404-text">404</h1>
            <p className="dp-404-sub">Page not found</p>
          </div>
        );
      case 'career':
        return (
          <div className="dp-career-container">
            <div className="dp-job-post">
              <h3 className="dp-job-title">Senior React Developer</h3>
              <p className="dp-job-desc">We are looking for an experienced frontend architect to lead our scalable UI initiatives. Must have a deep understanding of React, TypeScript, and modern CSS paradigms. Remote available.</p>
              <button className="dp-apply-btn">Apply Now</button>
            </div>
            <div className="dp-job-post">
              <h3 className="dp-job-title">Creative UI/UX Designer</h3>
              <p className="dp-job-desc">Join our design team to craft stunning, dynamic user interfaces. Experience with Figma, micro-animations, and modern web design aesthetics is required.</p>
              <button className="dp-apply-btn">Apply Now</button>
            </div>
            <div className="dp-job-post">
              <h3 className="dp-job-title">Backend Architect</h3>
              <p className="dp-job-desc">Seeking a robust system designer to establish our scalable backend infrastructure in Node.js and Postgres. Focus on security and high-availability operations.</p>
              <button className="dp-apply-btn">Apply Now</button>
            </div>
          </div>
        );
      case 'legal':
        return (
          <div className="dp-legal-container">
            <h3 className="dp-legal-sub">1. Data Collection & Usage</h3>
            <p className="dp-legal-text">
              We collect information to provide better services to our users. This may include basic technical information, such as your IP address, browser type, and operating system, as well as data regarding your interactions with our platform. This data is strictly used for performance optimization and error monitoring.
            </p>
            <h3 className="dp-legal-sub">2. User Rights & Permissions</h3>
            <p className="dp-legal-text">
              Users retain the right to request the deletion or modification of their personal data at any given time. We are committed to remaining transparent about what data is collected, how it is processed, and who it is shared with. Security protocols have been natively implemented to protect this data from unauthorized external access.
            </p>
            <h3 className="dp-legal-sub">3. Third-Party Services</h3>
            <p className="dp-legal-text">
              Our website may contain links to or integrations with third-party products. We are not responsible for the privacy practices or the content of such external websites. We encourage our users to be aware when they leave our platform and to read the privacy statements of each external site.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dp-wrapper">
      {/* Absolute Home Escape Router mimicking ProjectsPage structure */}
      <button 
        className="project-action-btn project-home-btn" 
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '4vh', left: '4vw', zIndex: 10 }}
      >
        <div className="project-action-icon-circle">
          <img src={arrowHomeIcon} alt="arrow home" className="project-action-arrow" />
        </div>
        <span>HOME</span>
      </button>

      {/* Absolute Background Asterisk */}
      <img src={asteriskImage} alt="Background Watermark" className="dp-bg-asterisk" />
      
      <div className="dp-content-layer">
        <div className="dp-header-row">
          <h2 className="dp-main-title">{title}</h2>
          <div className="dp-line-bar"></div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DefaultPage;
