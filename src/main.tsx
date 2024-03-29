// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './AppRouter';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
