import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
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
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Placeholder title="About" />} />
          <Route path="/services" element={<Placeholder title="Services" />} />
          <Route path="/portfolio" element={<Placeholder title="Portfolio" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="*" element={<Placeholder title="404 - Not Found" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
