import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ArtsContextProvider } from './context/ArtContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArtsContextProvider>
      <App />
      </ArtsContextProvider>
  </React.StrictMode>
);
