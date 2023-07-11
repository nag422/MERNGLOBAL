import React, { Suspense } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'features/home/HomePage';
import { ToastHeader } from 'reactstrap';
import ProductsPage from 'features/products/ProductsPage';

function App() {
  return (
    <div className="App">
      <ToastHeader
        position="top-right"
      />
      <BrowserRouter>
      <Suspense>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
        </Routes>        
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
