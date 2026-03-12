import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="grain"></div>
    {/* isolated wrapper: puts all app content above the grain layer */}
    <div style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
      <App />
    </div>
  </StrictMode>,
);
