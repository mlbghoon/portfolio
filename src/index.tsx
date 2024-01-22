import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './globals.scss';


const root = ReactDOM.createRoot(document.getElementById('app') as Element);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
