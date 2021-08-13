import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import CreateProduct from '../create-product-page/CreateProduct';
import Header from '../header/Header';
import Footer from '../footer/Footer';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <Header />
      <Switch>
        <div className="content-container">
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/maintenance/createproduct" render={() => <CreateProduct />} />
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
