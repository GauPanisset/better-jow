import '@/assets/globals.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './Popup.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
