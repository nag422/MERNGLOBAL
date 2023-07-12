import React, { Suspense, lazy } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastHeader } from 'reactstrap';
import ProductLayout from 'components/layouts/ProductLayout';

const HomePage = lazy(()=> import('features/home/HomePage'));
const ProductsPage = lazy(()=> import('features/products/ProductsPage'));

function App() {
  return (
    <div className="App">
      <ToastHeader
        position="top-right"
      />
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route index element={<HomePage />} />            
            <Route path="products" element={<ProductLayout />}>
              <Route index element={<ProductsPage />} />
            </Route>
        </Routes>        
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
