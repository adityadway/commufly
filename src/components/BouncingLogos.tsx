import React, { useEffect, useRef, useState } from 'react';
import './BouncingLogos.css';

import logo1 from '../assets/images/logo/Frame 1.png';
import logo2 from '../assets/images/logo/Google-Antigravity-Icon-Full-Color.png';
import logo4 from '../assets/images/logo/icons8-framer-logo-24.png';
import logo5 from '../assets/images/logo/icons8-instagram-logo-94.png';
import logo6 from '../assets/images/logo/icons8-meta-94.png';
import logo7 from '../assets/images/logo/icons8-react-80.png';
import logo8 from '../assets/images/logo/illustrator.png';
import logo9 from '../assets/images/logo/search.png';

const logos = [logo1, logo2, logo4, logo5, logo6, logo7, logo8, logo9];

interface LogoItem {
  id: number;
  src: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BouncingLogos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoState, setLogoState] = useState<LogoItem[]>([]);
  const requestRef = useRef<number>(0);
  const stateRef = useRef<LogoItem[]>([]);

  useEffect(() => {
    // Only initialize bouncing logic for mobile viewports
    if (window.innerWidth > 768) return;
    if (!containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;
    const logoSize = 40; // The fixed size of our logos in px
    
    if (clientHeight <= logoSize || clientWidth <= logoSize) return;

    // Give each logo a random starting edge and speed so they don't clump
    const initialLogos: LogoItem[] = logos.map((src, idx) => {
      const x = Math.random() * (clientWidth - logoSize);
      const y = Math.random() * (clientHeight - logoSize);
      
      const speed = 1.2; 
      const vx = (Math.random() > 0.5 ? speed : -speed) * (0.8 + Math.random() * 0.6);
      const vy = (Math.random() > 0.5 ? speed : -speed) * (0.8 + Math.random() * 0.6);

      return { id: idx, src, x, y, vx, vy };
    });

    stateRef.current = initialLogos;
    setLogoState(initialLogos);

    const animate = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      
      const newLogos = stateRef.current.map((l) => {
        let nx = l.x + l.vx;
        let ny = l.y + l.vy;
        let nvx = l.vx;
        let nvy = l.vy;

        // Collision logic
        if (nx <= 0) {
          nx = 0; nvx = Math.abs(l.vx);
        } else if (nx >= clientWidth - logoSize) {
          nx = clientWidth - logoSize; nvx = -Math.abs(l.vx);
        }

        if (ny <= 0) {
          ny = 0; nvy = Math.abs(l.vy);
        } else if (ny >= clientHeight - logoSize) {
          ny = clientHeight - logoSize; nvy = -Math.abs(l.vy);
        }

        return { ...l, x: nx, y: ny, vx: nvx, vy: nvy };
      });

      stateRef.current = newLogos;
      setLogoState(newLogos);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="bouncing-logos-container" ref={containerRef}>
      {logoState.map((l) => (
        <img
          key={l.id}
          src={l.src}
          className="bouncing-logo-img"
          style={{ transform: `translate(${l.x}px, ${l.y}px)` }}
          alt="Bouncing Logo"
        />
      ))}
    </div>
  );
};

export default BouncingLogos;
