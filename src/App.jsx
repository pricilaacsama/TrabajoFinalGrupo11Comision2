import { Routes, Route } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import Home from './assets/pages/Home';
import Favoritos from './assets/pages/Favoritos';
import productosData from './assets/data/productos.json';
import Error from './assets/pages/Error';
import Acerca from './assets/pages/Acerca'
import './App.css';
import { useState } from 'react';

function App() {
  const [productos, setProductos] = useState(productosData);
  

  return (
    <>
    <NavBar/>
    <Routes>
          <Route path="/" element={<Home productos={productos} />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/acerca" element={<Acerca /> } />
          <Route path="*" element={<Error />} />
    </Routes>
      
    </>
  )
}

export default App
