import React from 'react';
import { Link } from 'react-router-dom';
import asteriskImage from '../assets/images/Asterisk-PNG-Free-Image.png';
import './ProjectHeader.css';

interface ProjectHeaderProps {
  title?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title = 'PROJECTS' }) => {
  return (
    <header className="project-header">
      <h1 className="project-header-title">{title}</h1>
      <Link to="/" className="project-header-logo-link">
        <img src={asteriskImage} alt="Commufly Logo" className="project-header-logo" />
      </Link>
    </header>
  );
};

export default ProjectHeader;
