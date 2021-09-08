/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import UserProfile from '../user/UserProfile';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Create from '../create-product-page/Create';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DataTable from '../product-data-view/DataTable';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="app-container">
    <ToastContainer />
    <BrowserRouter>
      <div className="content-container">
        <Header />
      </div>
      <Switch>
        <div className="content-container">
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/maintenance" render={() => <DataTable />} />
          <Route exact path="/user" render={() => <UserProfile />} />
          <Route exact path="/maintenance/create" render={() => <Create />} />
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        </div>
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
