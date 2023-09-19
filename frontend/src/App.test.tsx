import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ProductNavBar } from 'components/navbars';
import { LoginForm } from 'features/home/auth';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { BrowserRouter, Routes } from 'react-router-dom';
// import ProductsPage from 'features/products/ProductsPage';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('is content have', () => {
//   render(<ProductNavBar userinfo={""} />);
//   const haveTitle = screen.getByText(/User/i);
//   expect(haveTitle).toBeInTheDocument();
// })

describe("Login testing", () => {
  it("Login testing", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <LoginForm modaltypehandler={"login"} />
      </BrowserRouter>
    </Provider>)
    const textvalue = screen.getByRole("button");
    expect(textvalue).toHaveTextContent("Login");
  })
})
