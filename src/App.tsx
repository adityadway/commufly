import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import LoadingScreen from './components/LoadingScreen';
import AboutPage from './pages/AboutPage';
import DefaultPage from './components/DefaultPage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showHeader = location.pathname === '/';
  const showFooter = ['/', '/projects', '/about'].includes(location.pathname);

  return (
    <>
      <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          backgroundColor: showFooter ? '#EDEDED' : '#000000',
          minHeight: '100vh',
          boxShadow: showFooter ? '0 10px 30px rgba(0,0,0,0.1)' : 'none' 
      }}>
        {showHeader && <Header />}
        <main style={{ flex: '1' }}>
          {children}
        </main>
      </div>

      {showFooter && (
        <>
          {/* Spacer to allow scrolling past the shutter and interacting with the fixed footer */}
          <div className="footer-scroll-spacer" style={{ height: '100vh' }}></div>
          {/* Reveal Layer (Fixed behind everything) */}
          <Footer />
        </>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [loadingPhase, setLoadingPhase] = React.useState<'loading' | 'transitioning' | 'complete'>('loading');
  const [isSubPage] = React.useState(() => {
    const p = window.location.pathname;
    return p.startsWith('/projects') || p.startsWith('/about') || p.startsWith('/contact') || p.startsWith('/services');
  });

  React.useEffect(() => {
    const startTime = Date.now();
    
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(3000 - elapsedTime, 0);

      setTimeout(() => {
        setLoadingPhase('transitioning');
        // Wait for the shared element transition to complete (approx 1.2s)
        setTimeout(() => {
          setLoadingPhase('complete');
        }, 1200);
      }, delay);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <Router>
      {loadingPhase !== 'complete' && <LoadingScreen phase={loadingPhase} isSubPage={isSubPage} />}
      <div 
        className={`app-container ${loadingPhase}`}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          opacity: loadingPhase === 'complete' ? 1 : (loadingPhase === 'transitioning' ? 1 : 0),
          transition: 'opacity 0.8s ease-in-out'
        }}
      >
        {/* Shutter Layer */}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<DefaultPage type="career" title="Join Our Team" />} />
              <Route path="/terms" element={<DefaultPage type="legal" title="Terms & Conditions" />} />
              <Route path="/privacy" element={<DefaultPage type="legal" title="Privacy Policy" />} />
              <Route path="*" element={<DefaultPage type="404" title="Error 404" />} />
            </Routes>
          </Layout>
      </div>
    </Router>
  );
};

export default App;
