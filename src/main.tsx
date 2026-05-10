import AppCanvas from './app_canvas.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppCanvas />
  </StrictMode>,
);
