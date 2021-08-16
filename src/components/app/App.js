import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="app-container">
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <Switch>
        <div className="content-container">
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route
            exact
            path="/confirmation"
            render={() => <ConfirmationPage />}
          />
        </div>
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
