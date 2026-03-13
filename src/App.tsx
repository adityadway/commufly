import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '3rem', color: 'var(--text-secondary)' }}>{title} Page Coming Soon</h1>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Shutter Layer */}
        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          backgroundColor: '#EDEDED',
          minHeight: '100vh',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
        }}>
          <Header />
          <main style={{ flex: '1' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Placeholder title="About" />} />
              <Route path="/services" element={<Placeholder title="Services" />} />
              <Route path="/portfolio" element={<Placeholder title="Portfolio" />} />
              <Route path="/contact" element={<Placeholder title="Contact" />} />
              <Route path="*" element={<Placeholder title="404 - Not Found" />} />
            </Routes>
          </main>
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
