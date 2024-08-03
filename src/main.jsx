import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ArrayProvider from './contexts/array.jsx';
import { GlobalStyles } from './globalstyles.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <ArrayProvider>
        <App />
      </ArrayProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
