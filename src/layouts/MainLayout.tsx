import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {/* Temporary spacer for visibility */}
      <div style={{ margin: '1000px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '14px', letterSpacing: '1px' }}>
        — temp spacer —
      </div>
      <main style={{ flex: '1' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
