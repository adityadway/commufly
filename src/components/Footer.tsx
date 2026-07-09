import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import asterisk from '../assets/images/Asterisk-PNG-Free-Image.png';
import linkedinIcon from '../assets/images/linkedin.svg';
import xIcon from '../assets/images/x.svg';
import ytIcon from '../assets/images/yt.svg';
import instagramIcon from '../assets/images/instagram.svg';
import arrowIcon from '../assets/images/arrow.svg';
import indiaFlagIcon from '../assets/images/India Flag.svg';

// Custom Country Selector Component
const CountrySelect: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({ code: '+91', flag: indiaFlagIcon, name: 'India' });

  const countries = [
    { code: '+91', flag: indiaFlagIcon, name: 'India' },
    { code: '+1', flag: 'https://flagcdn.com/us.svg', name: 'United States' },
    { code: '+44', flag: 'https://flagcdn.com/gb.svg', name: 'United Kingdom' },
    { code: '+61', flag: 'https://flagcdn.com/au.svg', name: 'Australia' },
    { code: '+49', flag: 'https://flagcdn.com/de.svg', name: 'Germany' },
    { code: '+33', flag: 'https://flagcdn.com/fr.svg', name: 'France' },
    { code: '+81', flag: 'https://flagcdn.com/jp.svg', name: 'Japan' },
    { code: '+86', flag: 'https://flagcdn.com/cn.svg', name: 'China' },
    { code: '+55', flag: 'https://flagcdn.com/br.svg', name: 'Brazil' },
    { code: '+971', flag: 'https://flagcdn.com/ae.svg', name: 'UAE' },
  ];

  return (
    <div className="footer-country-dropdown">
      <div className="footer-country-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src={selected.flag} alt={selected.name} className="footer-flag-icon" />
        <span className="footer-country-code">{selected.code}</span>
        <svg className="footer-country-arrow" viewBox="0 0 24 24" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M6 9L12 15L18 9" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isOpen && (
        <div className="footer-country-menu">
          {countries.map((c) => (
            <div
              key={c.name}
              className="footer-country-option"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(c);
                setIsOpen(false);
              }}
            >
              <img src={c.flag} alt={c.name} className="footer-flag-icon" />
              <span className="footer-country-code-list">{c.code}</span>
              <span className="footer-country-name">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  const [service, setService] = React.useState('');

  return (
    <div className="footer-container" id="footer-section">
      <div className="footer-main-content">
        {/* Top two-column row */}
        <div className="footer-cta-row">
          {/* Column 1: asterisk image + text */}
          <div className="footer-col footer-col-left">
            <img src={asterisk} alt="Asterisk" className="footer-cta-asterisk" />
            <div className="footer-cta-text">
              <p className="footer-cta-bold">Got an idea?</p>
              <p className="footer-cta-normal">Start building today.</p>
            </div>
          </div>
          {/* Column 2: nav links */}
          <div className="footer-col footer-col-right">
            {[
              { label: 'From UI/UX to AX: Designing for Intelligent Experiences in the AI Era', href: 'https://medium.com/@adityadway/from-ui-ux-to-ax-designing-for-intelligent-experiences-in-the-ai-era-056bba19d70a' },
              { label: 'UI Design Direction 2026–2027', href: 'https://medium.com/@michalmalewicz/ui-design-direction-2026-2027-2b4b6eb88336' },
              { label: 'Why I Think AI Websites Are Making Business Promotion Easier', href: 'https://medium.com/tales-untold/why-i-think-ai-websites-are-making-business-promotion-easier-254c9fd27c84' },
              { label: 'Why User Experience (UX) Matters in Website Design', href: 'https://medium.com/thehanomatimes/why-user-experience-ux-matters-in-website-design-38747245024a' },
              { label: 'Real designers don’t care about AI', href: 'https://medium.com/@melkoh/real-designers-dont-care-about-ai-93ff5fa11c05' }
            ].map((item) => (
              <a 
                href={item.href} 
                className="footer-nav-link" 
                key={item.label}
                target={item.href.startsWith('http') ? "_blank" : undefined}
                rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                <span>{item.label}</span>
                <img src={arrowIcon} alt="arrow" className="footer-nav-arrow" />
              </a>
            ))}
          </div>
        </div>

        {/* Second row: form (left) + nav links (right) */}
        <div className="footer-row-2">
          {/* Column 1: Client Intake Form */}
          <form 
            id="footer-client-form"
            className="footer-col footer-col-left-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              alert(`Thanks for reaching out, ${data.name || 'there'}! We'll get back to you soon.`);
            }}
          >
            {/* Row 1: Heading */}
            <div className="footer-form-heading-row">
              <h3 className="footer-form-heading">CLIENT INTAKE</h3>
            </div>

            {/* Row 2: Name */}
            <input type="text" name="name" className="footer-form-input" placeholder="Your Name" required />

            {/* Row 3: Organization */}
            <input type="text" name="organization" className="footer-form-input" placeholder="Your Organization Name" />

            {/* Row 4: Email */}
            <input type="email" name="email" className="footer-form-input" placeholder="Your Email" required />

            {/* Row 5: Phone with Custom Flag Dropdown */}
            <div className="footer-form-phone-row">
              <CountrySelect />
              <input
                type="tel"
                name="phone"
                className="footer-form-input footer-form-phone-input"
                placeholder="00000 00000"
                maxLength={11}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, ''); // strip non-digits
                  if (val.length > 5) {
                    val = val.slice(0, 5) + ' ' + val.slice(5, 10);
                  }
                  e.target.value = val;
                }}
              />
            </div>

            {/* Row 6: Service Dropdown */}
            <div className="footer-form-select-wrapper">
              <select 
                name="service"
                className={`footer-form-input footer-form-select ${service ? 'has-value' : ''}`}
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="" disabled>Select Service</option>
                <option value="web">Web Development</option>
                <option value="design">UI/UX Design</option>
                <option value="seo">SEO</option>
              </select>
              <svg className="footer-form-select-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </form>
          <div className="footer-row-2-right">
            <Link to="/projects" className="footer-sitemap-link footer-sitemap-bold" onClick={() => window.scrollTo(0,0)}>WORK</Link>
            <Link to="/about" className="footer-sitemap-link footer-sitemap-bold" onClick={() => window.scrollTo(0,0)}>ABOUT</Link>
            <a href="/#services" className="footer-sitemap-link footer-sitemap-bold">SERVICES</a>
            <a 
              href="#footer-section" 
              className="footer-sitemap-link footer-sitemap-bold"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
            >
              CONTACT
            </a>
            <Link to="/careers" className="footer-sitemap-link footer-sitemap-bold" onClick={() => window.scrollTo(0,0)}>CAREERS</Link>
            <Link to="/terms" className="footer-sitemap-link" onClick={() => window.scrollTo(0,0)}>Terms & Conditions</Link>
            <Link to="/privacy" className="footer-sitemap-link" onClick={() => window.scrollTo(0,0)}>Privacy Policy</Link>
          </div>

          <div className="footer-submit-wrapper">
            <div className="footer-submit-container">
              <button type="submit" form="footer-client-form" className="footer-submit-btn">
                <span>Let's Talk</span>
                <div className="footer-submit-icon-circle">
                  <img src={arrowIcon} alt="arrow" className="footer-submit-arrow" />
                </div>
              </button>
              <div className="footer-hover-strip">
                <span className="footer-hover-strip-text">
                  Want a personalized response or a quick talk? Call us: <strong className="footer-strip-highlight">+91 86193 32735</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-asterisk-wrapper">
        <img
          src={asterisk}
          alt="Asterisk"
          className="footer-asterisk-img"
        />
      </div>
      <div className="footer-bottom-bar">
        <p className="footer-copyright">© 2026 commufly. All right reserved</p>
        <div className="footer-social-icons">
          <a href="#" aria-label="LinkedIn"><img src={linkedinIcon} alt="LinkedIn" /></a>
          <a href="#" aria-label="X"><img src={xIcon} alt="X" /></a>
          <a href="#" aria-label="YouTube"><img src={ytIcon} alt="YouTube" /></a>
          <a href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
        </div>
      </div>
      <div className="footer-bottom-line" />
    </div>
  );
};

export default Footer;
