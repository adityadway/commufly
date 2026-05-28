import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader';
import arrowIcon from '../assets/images/arrow.svg';
import arrowHomeIcon from '../assets/images/Arrow home.svg';
import aboutImage from '../assets/images/about us.png';
import aboutImage2 from '../assets/images/vision.png';

import teamImg1 from '../assets/images/Team/Aditya Dave - Full-stack Engineer.png';
import teamImg2 from '../assets/images/Team/Divyam Dave - AI Automation.png';
import teamImg3 from '../assets/images/Team/Divynshi Verma -  Managment .png';
import teamImg4 from '../assets/images/Team/Kuldeep Singh - UI:UX Graphic.png';
import teamImg5 from '../assets/images/Team/Kunal Sharma - Core Developer.png';
import teamImg6 from '../assets/images/Team/Ritika Sharma - Data Analyst.png';
import './AboutPage.css';

interface FlipDigitProps {
  digit: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (digit !== displayDigit) {
      setAnimationClass('flip-active');
      const timeout = setTimeout(() => {
        setDisplayDigit(digit);
        setAnimationClass('');
      }, 350); // duration of the flip animation
      return () => clearTimeout(timeout);
    }
  }, [digit, displayDigit]);

  return (
    <span className="flip-digit-wrapper">
      <span className={`flip-digit-card ${animationClass}`}>
        <span className="flip-card-face flip-card-front">{displayDigit}</span>
        <span className="flip-card-face flip-card-back">{digit}</span>
      </span>
    </span>
  );
};

interface FlipCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const FlipCounter: React.FC<FlipCounterProps> = ({ target, suffix = '', duration = 2000 }) => {
  const [currentVal, setCurrentVal] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            setCurrentVal(Math.floor(easeProgress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCurrentVal(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  const digitStrings = currentVal.toString().split('');

  return (
    <span ref={elementRef} className="flip-counter-container">
      {digitStrings.map((d, idx) => (
        <FlipDigit key={idx} digit={d} />
      ))}
      {suffix && <span className="flip-counter-suffix">{suffix}</span>}
    </span>
  );
};

interface TeamMemberCardProps {
  imgSrc: string;
  name: string;
  role: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ imgSrc, name, role }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.querySelector('.team-image-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsHovered(true);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="about-collage-item team-card-interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="team-image-container">
        <img src={imgSrc} alt={name} className="about-collage-img" />
        {isHovered && (
          <div
            className="team-hover-tooltip"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <div className="team-tooltip-role">{role}</div>
            <div className="team-tooltip-name">{name}</div>
          </div>
        )}
      </div>

      <div className="team-mobile-details-card">
        <div className="team-tooltip-role">{role}</div>
        <div className="team-tooltip-name">{name}</div>
      </div>
    </div>
  );
};

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
              <h2 className="about-desc-title">OUR VISION</h2>
              <h3 className="about-desc-subtitle">Looking Forward</h3>
              <p className="about-desc-text">
                We aim to redefine the boundaries of digital possibility. By continuously exploring emerging technologies and design trends, we empower brands to connect meaningfully in a rapidly evolving world. Our focus is on sustainable, scalable solutions that not only solve today's challenges but also anticipate tomorrow's opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="about-split-layout about-metrics-bar">
          <div className="about-metric-item">
            <div className="about-metric-number">
              <FlipCounter target={50} suffix="+" />
            </div>
            <div className="about-metric-label">
              <div>Clients</div>
              <div>Delivered</div>
            </div>
          </div>
          <div className="about-metrics-divider"></div>
          <div className="about-metric-item">
            <div className="about-metric-number">
              <FlipCounter target={2} suffix="x" />
            </div>
            <div className="about-metric-label">
              <div>Awwwards</div>
              <div>Winner</div>
            </div>
          </div>
          <div className="about-metrics-divider"></div>
          <div className="about-metric-item">
            <div className="about-metric-number">AI</div>
            <div className="about-metric-label">
              <div>Driven</div>
              <div>Automation</div>
            </div>
          </div>
        </div>
      </main>
      <div className="team-members-strip">
        <span className="team-strip-item">TEAM MEMBER</span>
        <span className="team-strip-item">TEAM MEMBER</span>
        <span className="team-strip-item">TEAM MEMBER</span>
        <span className="team-strip-item">TEAM MEMBER</span>
      </div>

      <main className="about-page-content about-page-content-bottom" style={{ paddingTop: 0, gap: '2vh' }}>
        <div className="about-split-layout about-collage-container">
          {/* Row 1: 3 columns */}
          <div className="about-collage-row">
            <TeamMemberCard imgSrc={teamImg1} name="Aditya Dave" role="Full-stack Engineer" />
            <TeamMemberCard imgSrc={teamImg2} name="Divyam Dave" role="AI Automation" />
            <TeamMemberCard imgSrc={teamImg3} name="Divynshi Verma" role="Management" />
          </div>
          {/* Row 2: 3 columns */}
          <div className="about-collage-row">
            <TeamMemberCard imgSrc={teamImg4} name="Kuldeep Singh" role="UI/UX Graphic" />
            <TeamMemberCard imgSrc={teamImg5} name="Kunal Sharma" role="Core Developer" />
            <TeamMemberCard imgSrc={teamImg6} name="Ritika Sharma" role="Data Analyst" />
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
