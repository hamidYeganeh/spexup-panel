// scroll bar
import 'simplebar/dist/simplebar.css';

import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
//
import App from './App';

// ----------------------------------------------------------------------

const rootElement = document.getElementById('root')
const root  = createRoot(rootElement)

root.render(
  <HelmetProvider>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </HelmetProvider>
);
