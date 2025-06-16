import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './assets/contexts/AutorizacionesContext';

import { ProductosProvider } from './assets/contexts/productosContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductosProvider>
    </AuthProvider>
  </StrictMode>
);

