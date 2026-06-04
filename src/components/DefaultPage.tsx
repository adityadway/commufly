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
          <div className="dp-404-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vh' }}>
            <h1 className="dp-404-text">404</h1>
            <p className="dp-404-sub" style={{ margin: 0 }}>Page Not Found</p>
            <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 1.2vw, 20px)', fontFamily: 'Saira Condensed', textAlign: 'center', maxWidth: '450px', margin: '1vh 0' }}>
              The page you are looking for doesn't exist or has been moved. Let's get you back home safely.
            </p>
            <button 
              className="project-action-btn" 
              onClick={() => navigate('/')}
              style={{ marginTop: '2vh' }}
            >
              <span>GO BACK HOME</span>
              <div className="project-action-icon-circle">
                <img src={arrowHomeIcon} alt="arrow home" className="project-action-arrow" style={{ filter: 'brightness(0)' }} />
              </div>
            </button>
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
        if (title.toLowerCase().includes('terms')) {
          return (
            <div className="dp-legal-container">
              <p className="dp-legal-date">Effective Date: June 5, 2026</p>
              <p className="dp-legal-text">
                Welcome to Commufly. By accessing or using our website, services, content, or digital platforms, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our website or services.
              </p>

              <h3 className="dp-legal-sub">1. About Commufly</h3>
              <p className="dp-legal-text">
                Commufly is an AI-first creative and technology company providing services including, but not limited to:
              </p>
              <ul className="dp-legal-list">
                <li>UI/UX Design</li>
                <li>Brand Identity Design</li>
                <li>Website Development</li>
                <li>Mobile Application Development</li>
                <li>AI Solutions & Automation</li>
                <li>Digital Marketing</li>
                <li>Product Strategy</li>
                <li>Creative Consulting</li>
                <li>Content & Design Systems</li>
              </ul>

              <h3 className="dp-legal-sub">2. Acceptance of Terms</h3>
              <p className="dp-legal-text">
                By using this website, contacting us, submitting forms, requesting services, or engaging with our content, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
              </p>

              <h3 className="dp-legal-sub">3. Use of Website</h3>
              <p className="dp-legal-text">
                You agree to use this website lawfully and responsibly.
              </p>
              <p className="dp-legal-text">You may not:</p>
              <ul className="dp-legal-list">
                <li>Attempt unauthorized access to our systems.</li>
                <li>Distribute malicious software or harmful code.</li>
                <li>Misrepresent your identity.</li>
                <li>Use the website for unlawful activities.</li>
                <li>Interfere with the functionality or security of the website.</li>
                <li>Scrape, automate, or harvest website data without permission.</li>
              </ul>
              <p className="dp-legal-text">
                We reserve the right to restrict access to users who violate these terms.
              </p>

              <h3 className="dp-legal-sub">4. Services & Project Engagement</h3>
              <p className="dp-legal-text">
                Any proposal, quotation, estimate, timeline, or project plan provided by Commufly is subject to review and mutual agreement.
              </p>
              <p className="dp-legal-text">Project timelines may be affected by:</p>
              <ul className="dp-legal-list">
                <li>Scope changes</li>
                <li>Delayed client feedback</li>
                <li>Third-party dependencies</li>
                <li>Technical limitations</li>
                <li>Force majeure events</li>
              </ul>
              <p className="dp-legal-text">
                Clients are responsible for providing accurate information, content, approvals, and resources necessary for project completion.
              </p>

              <h3 className="dp-legal-sub">5. Payments & Refunds</h3>
              <p className="dp-legal-text">
                Payment terms will be defined in individual project agreements.
              </p>
              <p className="dp-legal-text">Unless otherwise agreed:</p>
              <ul className="dp-legal-list">
                <li>Advance payments may be required before work begins.</li>
                <li>Delayed payments may result in project suspension.</li>
                <li>Completed work remains the property of Commufly until payment obligations are fulfilled.</li>
                <li>Refunds are evaluated on a case-by-case basis and may not apply to completed work, consulting services, custom development, or delivered digital assets.</li>
              </ul>

              <h3 className="dp-legal-sub">6. Intellectual Property</h3>
              <p className="dp-legal-text">
                All content on this website, including designs, graphics, text, illustrations, videos, branding, software, source code, frameworks, documentation, and creative materials, is protected by intellectual property laws.
              </p>
              <p className="dp-legal-text">
                Ownership remains with Commufly unless explicitly transferred through a written agreement.
              </p>

              <h3 className="dp-legal-sub">7. Design Inspiration & Creative Usage</h3>
              <p className="dp-legal-text">
                At Commufly, we believe creativity grows through inspiration.
              </p>
              <p className="dp-legal-text">
                We encourage designers, developers, marketers, creators, and businesses to learn from and draw inspiration from our publicly visible work.
              </p>
              <p className="dp-legal-text">You are welcome to:</p>
              <ul className="dp-legal-list">
                <li>Learn from our design approaches.</li>
                <li>Study our creative concepts.</li>
                <li>Take inspiration from our ideas.</li>
                <li>Use our work as motivation for creating something original.</li>
              </ul>
              <p className="dp-legal-text">However, you may not:</p>
              <ul className="dp-legal-list">
                <li>Directly copy and republish our designs.</li>
                <li>Clone our website, products, or branding.</li>
                <li>Reproduce substantial portions of our work without permission.</li>
                <li>Use our logo, name, or identity in a misleading way.</li>
                <li>Present Commufly-created work as your own.</li>
              </ul>
              <p className="dp-legal-text" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                We support inspiration. We do not support imitation.
              </p>

              <h3 className="dp-legal-sub">8. Client Deliverables & Ownership</h3>
              <p className="dp-legal-text">
                Unless otherwise stated:
              </p>
              <ul className="dp-legal-list">
                <li>Clients receive rights to approved deliverables upon full payment.</li>
                <li>Third-party assets remain governed by their respective licenses.</li>
                <li>Open-source software remains subject to its original license terms.</li>
                <li>Commufly may retain ownership of internal tools, frameworks, methodologies, and reusable components.</li>
              </ul>

              <h3 className="dp-legal-sub">9. AI Services Disclaimer</h3>
              <p className="dp-legal-text">
                Commufly may use artificial intelligence technologies to assist with:
              </p>
              <ul className="dp-legal-list">
                <li>Design generation</li>
                <li>Content creation</li>
                <li>Automation workflows</li>
                <li>Software development</li>
                <li>Data processing</li>
                <li>Research and analysis</li>
              </ul>
              <p className="dp-legal-text">
                While we strive for quality and accuracy, AI-generated outputs may contain inaccuracies, omissions, or unexpected results.
              </p>
              <p className="dp-legal-text">
                Clients are responsible for reviewing and validating outputs before business-critical, legal, financial, medical, or regulatory use.
              </p>

              <h3 className="dp-legal-sub">10. Marketing Performance Disclaimer</h3>
              <p className="dp-legal-text">
                Marketing results depend on numerous factors beyond our control.
              </p>
              <p className="dp-legal-text">We do not guarantee:</p>
              <ul className="dp-legal-list">
                <li>Search engine rankings</li>
                <li>Advertisement performance</li>
                <li>Lead generation volume</li>
                <li>Revenue growth</li>
                <li>Sales outcomes</li>
                <li>Viral reach</li>
                <li>Social media engagement</li>
              </ul>
              <p className="dp-legal-text">
                Past performance does not guarantee future results.
              </p>

              <h3 className="dp-legal-sub">11. Third-Party Services</h3>
              <p className="dp-legal-text">
                Our services may integrate with third-party providers including hosting platforms, analytics providers, advertising platforms, AI providers, cloud infrastructure services, APIs, and software tools.
              </p>
              <p className="dp-legal-text">Commufly is not responsible for:</p>
              <ul className="dp-legal-list">
                <li>Third-party outages</li>
                <li>Policy changes</li>
                <li>Pricing changes</li>
                <li>Service disruptions</li>
                <li>Data loss caused by third-party systems</li>
              </ul>

              <h3 className="dp-legal-sub">12. Confidentiality</h3>
              <p className="dp-legal-text">
                We respect the confidentiality of client information.
              </p>
              <p className="dp-legal-text">
                Information shared during projects will not be intentionally disclosed to unauthorized parties except:
              </p>
              <ul className="dp-legal-list">
                <li>When required by law.</li>
                <li>When necessary for service delivery.</li>
                <li>With explicit client consent.</li>
              </ul>
              <p className="dp-legal-text">
                Clients are encouraged to request a separate Non-Disclosure Agreement (NDA) where required.
              </p>

              <h3 className="dp-legal-sub">13. Portfolio Rights</h3>
              <p className="dp-legal-text">
                Unless otherwise agreed in writing, Commufly may showcase completed work in:
              </p>
              <ul className="dp-legal-list">
                <li>Portfolios</li>
                <li>Case studies</li>
                <li>Marketing materials</li>
                <li>Social media</li>
                <li>Presentations</li>
              </ul>
              <p className="dp-legal-text">
                Confidential projects will only be displayed with client approval.
              </p>

              <h3 className="dp-legal-sub">14. Website Availability</h3>
              <p className="dp-legal-text">
                We strive to maintain uninterrupted access to our website.
              </p>
              <p className="dp-legal-text">However, we do not guarantee:</p>
              <ul className="dp-legal-list">
                <li>Continuous availability</li>
                <li>Error-free operation</li>
                <li>Complete security</li>
                <li>Compatibility across all devices or browsers</li>
              </ul>
              <p className="dp-legal-text">
                Website features may be modified, updated, suspended, or removed at any time.
              </p>

              <h3 className="dp-legal-sub">15. Limitation of Liability</h3>
              <p className="dp-legal-text">
                To the fullest extent permitted by law, Commufly shall not be liable for:
              </p>
              <ul className="dp-legal-list">
                <li>Indirect damages</li>
                <li>Consequential damages</li>
                <li>Lost profits</li>
                <li>Lost business opportunities</li>
                <li>Data loss</li>
                <li>Service interruptions</li>
                <li>Security incidents beyond reasonable control</li>
              </ul>
              <p className="dp-legal-text">
                Use of our website and services is at your own risk.
              </p>

              <h3 className="dp-legal-sub">16. Indemnification</h3>
              <p className="dp-legal-text">
                You agree to defend, indemnify, and hold harmless Commufly, its team members, partners, contractors, and affiliates from claims, damages, liabilities, costs, and expenses arising from your misuse of our website, services, or violation of these Terms.
              </p>

              <h3 className="dp-legal-sub">17. Changes to These Terms</h3>
              <p className="dp-legal-text">
                We may update these Terms & Conditions at any time.
              </p>
              <p className="dp-legal-text">
                Changes become effective immediately upon publication on this page.
              </p>
              <p className="dp-legal-text">
                Continued use of our website after updates constitutes acceptance of the revised terms.
              </p>

              <h3 className="dp-legal-sub">18. Governing Law</h3>
              <p className="dp-legal-text">
                These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.
              </p>
              <p className="dp-legal-text">
                Any disputes arising under these terms shall be subject to the jurisdiction of the competent courts of India.
              </p>

              <h3 className="dp-legal-sub">19. Contact Us</h3>
              <p className="dp-legal-text">
                For questions regarding these Terms & Conditions, please contact:
              </p>
              <p className="dp-legal-text" style={{ fontWeight: 'bold' }}>
                Commufly<br />
                AI-First Design, Development & Marketing Company
              </p>

              <div className="dp-legal-philosophy" style={{ marginTop: '4vh', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3vh' }}>
                <h4 className="dp-legal-philosophy-title" style={{ fontFamily: 'Share Tech', color: '#4ED7F1', margin: '0 0 1vh 0' }}>Our Philosophy</h4>
                <p className="dp-legal-text" style={{ fontStyle: 'italic' }}>
                  "Build boldly. Learn openly. Create responsibly."
                </p>
                <p className="dp-legal-text">
                  We welcome inspiration, encourage innovation, and believe that technology, design, and AI should help people express ideas, solve meaningful problems, and build a better future.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="dp-legal-container">
              <p className="dp-legal-date">Effective Date: June 5, 2026</p>
              <p className="dp-legal-text">
                At Commufly, we value your privacy and are committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website, interact with our services, or communicate with us.
              </p>
              <p className="dp-legal-text">
                By using our website or services, you agree to the practices described in this Privacy Policy.
              </p>

              <h3 className="dp-legal-sub">1. Who We Are</h3>
              <p className="dp-legal-text">
                Commufly is an AI-first creative and technology company providing services including:
              </p>
              <ul className="dp-legal-list">
                <li>UI/UX Design</li>
                <li>Brand Identity Design</li>
                <li>Website Development</li>
                <li>Mobile Application Development</li>
                <li>AI Solutions & Automation</li>
                <li>Digital Marketing</li>
                <li>Product Strategy</li>
                <li>Creative Consulting</li>
              </ul>

              <h3 className="dp-legal-sub">2. Information We Collect</h3>
              <p className="dp-legal-text">
                We collect only the information necessary to provide and improve our services.
              </p>
              <p className="dp-legal-text" style={{ fontWeight: 'bold' }}>Information You Provide</p>
              <p className="dp-legal-text">When you:</p>
              <ul className="dp-legal-list">
                <li>Submit a contact form</li>
                <li>Request a quote</li>
                <li>Book a consultation</li>
                <li>Subscribe to updates</li>
                <li>Communicate with our team</li>
              </ul>
              <p className="dp-legal-text">We may collect:</p>
              <ul className="dp-legal-list">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Project details</li>
                <li>Messages and communications</li>
              </ul>

              <p className="dp-legal-text" style={{ fontWeight: 'bold' }}>Information Collected Automatically</p>
              <p className="dp-legal-text">When you visit our website, we may collect:</p>
              <ul className="dp-legal-list">
                <li>Device information</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Website usage data</li>
                <li>Pages visited</li>
                <li>Referral sources</li>
                <li>Session information</li>
              </ul>
              <p className="dp-legal-text">
                This information helps us improve user experience and website performance.
              </p>

              <h3 className="dp-legal-sub">3. How We Use Your Information</h3>
              <p className="dp-legal-text">We use information to:</p>
              <ul className="dp-legal-list">
                <li>Respond to inquiries</li>
                <li>Provide requested services</li>
                <li>Prepare proposals and quotations</li>
                <li>Improve our website and services</li>
                <li>Communicate project updates</li>
                <li>Send relevant business communications</li>
                <li>Maintain website security</li>
                <li>Analyze website performance</li>
              </ul>
              <p className="dp-legal-text">
                We do not sell your personal information.
              </p>

              <h3 className="dp-legal-sub">4. AI & Automation Services</h3>
              <p className="dp-legal-text">
                As an AI-first company, some services may involve AI-powered tools and automation systems.
              </p>
              <p className="dp-legal-text">
                Information processed through such systems may be used to:
              </p>
              <ul className="dp-legal-list">
                <li>Generate content</li>
                <li>Analyze requirements</li>
                <li>Improve workflows</li>
                <li>Create designs or prototypes</li>
                <li>Assist software development</li>
              </ul>
              <p className="dp-legal-text">
                We strive to use trusted platforms and responsible AI practices. However, users should avoid submitting highly confidential, classified, or sensitive information through public forms unless a separate agreement has been established.
              </p>

              <h3 className="dp-legal-sub">5. Cookies & Analytics</h3>
              <p className="dp-legal-text">
                Our website may use cookies and similar technologies to:
              </p>
              <ul className="dp-legal-list">
                <li>Improve website functionality</li>
                <li>Remember preferences</li>
                <li>Measure website performance</li>
                <li>Understand visitor behavior</li>
                <li>Enhance user experience</li>
              </ul>
              <p className="dp-legal-text">
                You may disable cookies through your browser settings, though some website features may not function properly.
              </p>

              <h3 className="dp-legal-sub">6. Third-Party Services</h3>
              <p className="dp-legal-text">
                We may use trusted third-party providers for:
              </p>
              <ul className="dp-legal-list">
                <li>Website hosting</li>
                <li>Analytics</li>
                <li>Cloud storage</li>
                <li>Email communication</li>
                <li>Customer support</li>
                <li>AI services</li>
                <li>Marketing tools</li>
              </ul>
              <p className="dp-legal-text">
                These providers may process information on our behalf and are expected to maintain appropriate security standards.
              </p>

              <h3 className="dp-legal-sub">7. Data Security</h3>
              <p className="dp-legal-text">
                We take reasonable technical and organizational measures to protect information against:
              </p>
              <ul className="dp-legal-list">
                <li>Unauthorized access</li>
                <li>Alteration</li>
                <li>Disclosure</li>
                <li>Misuse</li>
                <li>Loss</li>
              </ul>
              <p className="dp-legal-text">
                However, no internet transmission or storage system can be guaranteed to be completely secure.
              </p>

              <h3 className="dp-legal-sub">8. Data Retention</h3>
              <p className="dp-legal-text">
                We retain information only for as long as necessary to:
              </p>
              <ul className="dp-legal-list">
                <li>Provide services</li>
                <li>Meet legal obligations</li>
                <li>Resolve disputes</li>
                <li>Improve operations</li>
              </ul>
              <p className="dp-legal-text">
                Information that is no longer needed may be securely deleted or anonymized.
              </p>

              <h3 className="dp-legal-sub">9. Your Rights</h3>
              <p className="dp-legal-text">
                Depending on applicable laws, you may have the right to:
              </p>
              <ul className="dp-legal-list">
                <li>Access your information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent where applicable</li>
                <li>Request information about how your data is used</li>
              </ul>
              <p className="dp-legal-text">
                To exercise these rights, please contact us using the information below.
              </p>

              <h3 className="dp-legal-sub">10. Children's Privacy</h3>
              <p className="dp-legal-text">
                Our website and services are not directed toward children under the age of 13.
              </p>
              <p className="dp-legal-text">
                We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take appropriate steps to remove it.
              </p>

              <h3 className="dp-legal-sub">11. International Visitors</h3>
              <p className="dp-legal-text">
                If you access our website from outside India, you understand that your information may be processed and stored in locations where our service providers operate.
              </p>

              <h3 className="dp-legal-sub">12. Portfolio & Client Information</h3>
              <p className="dp-legal-text">
                We respect client confidentiality.
              </p>
              <p className="dp-legal-text">
                Project details, business information, and communications shared during engagements are treated with care and will not be publicly disclosed without permission, except where required by law or agreed upon in writing.
              </p>

              <h3 className="dp-legal-sub">13. Links to Other Websites</h3>
              <p className="dp-legal-text">
                Our website may contain links to external websites.
              </p>
              <p className="dp-legal-text">
                We are not responsible for the privacy practices, content, or policies of third-party websites. We encourage users to review the privacy policies of any website they visit.
              </p>

              <h3 className="dp-legal-sub">14. Changes to This Privacy Policy</h3>
              <p className="dp-legal-text">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="dp-legal-text">
                Any updates will be posted on this page with a revised effective date. Continued use of our website after updates indicates acceptance of the revised policy.
              </p>

              <h3 className="dp-legal-sub">15. Contact Us</h3>
              <p className="dp-legal-text">
                If you have any questions regarding this Privacy Policy or your personal information, please contact:
              </p>
              <p className="dp-legal-text" style={{ fontWeight: 'bold' }}>
                Commufly<br />
                AI-First Design, Development & Marketing Company
              </p>

              <div className="dp-legal-philosophy" style={{ marginTop: '4vh', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3vh' }}>
                <h4 className="dp-legal-philosophy-title" style={{ fontFamily: 'Share Tech', color: '#4ED7F1', margin: '0 0 1vh 0' }}>Our Commitment</h4>
                <p className="dp-legal-text" style={{ fontStyle: 'italic' }}>
                  Privacy is built on trust. We collect only what we need, protect what you share, and use information responsibly to create better experiences, products, and services. At Commufly, your data belongs to you.
                </p>
              </div>
            </div>
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="dp-wrapper">
      {/* Absolute Background Asterisk */}
      <img src={asteriskImage} alt="Background Watermark" className="dp-bg-asterisk" />
      
      <div className="dp-content-layer">
        {/* Home Escape Router in normal flow to prevent overlap */}
        <button 
          className="project-action-btn project-home-btn" 
          onClick={() => navigate('/')}
          style={{ alignSelf: 'flex-start', marginBottom: '1vh' }}
        >
          <div className="project-action-icon-circle">
            <img src={arrowHomeIcon} alt="arrow home" className="project-action-arrow" />
          </div>
          <span>HOME</span>
        </button>

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
