import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CompanyProvider } from './CompanyContext';
import router from './AppRouter';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CompanyProvider>
      <RouterProvider router={router} />
    </CompanyProvider>
  </React.StrictMode>
);