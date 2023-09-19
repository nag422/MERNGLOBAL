import React, { Suspense, lazy } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastHeader } from 'reactstrap';
import ProductLayout from 'components/layouts/ProductLayout';
import Book from 'features/book/Book';

const HomePage = lazy(()=> import('features/home/HomePage'));
const ProductsPage = lazy(()=> import('features/products/ProductsPage'));

function App() {
  return (
    <div className="App">
      {/* learn react */}
      <ToastHeader
        position="top-right"
      />
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route index element={<Book />} />            
            <Route path="/home" element={<HomePage />} />            
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
