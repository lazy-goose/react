import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import settings from '../settings.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={settings.base}>
      <App />
    </Router>
  </StrictMode>
);
