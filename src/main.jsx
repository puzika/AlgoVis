import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalProvider from './contexts/global.jsx';
import SortingProvider from './contexts/sorting.jsx';
import PathfindingProvider from './contexts/pathfinding.jsx';
import { GlobalStyles } from './globalstyles.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <GlobalProvider>
        <SortingProvider>
          <PathfindingProvider>
            <App />
          </PathfindingProvider>
        </SortingProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
