import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import LoadingScreen from './components/LoadingScreen';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '3rem', color: 'var(--text-secondary)' }}>{title} Page Coming Soon</h1>
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/projects';

  return (
    <>
      {showHeader && <Header />}
      <main style={{ flex: '1' }}>
        {children}
      </main>
    </>
  );
};

const App: React.FC = () => {
  const [loadingPhase, setLoadingPhase] = React.useState<'loading' | 'transitioning' | 'complete'>('loading');

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
      {loadingPhase !== 'complete' && <LoadingScreen phase={loadingPhase} />}
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
        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          backgroundColor: '#EDEDED',
          minHeight: '100vh',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
        }}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<Placeholder title="About" />} />
              <Route path="/services" element={<Placeholder title="Services" />} />
              <Route path="/contact" element={<Placeholder title="Contact" />} />
              <Route path="*" element={<Placeholder title="404 - Not Found" />} />
            </Routes>
          </Layout>
        </div>
        
        {/* Spacer to allow scrolling past the shutter and interacting with the fixed footer */}
        <div style={{ height: '100vh' }}></div>

        {/* Reveal Layer (Fixed behind everything) */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
