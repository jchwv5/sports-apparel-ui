/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../home-page/HomePage';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import UserProfile from '../user/UserProfile';
import Create from '../create-product-page/Create';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DataTable from '../product-data-view/DataTable';
import PurchaseHistoryPage from '../purchases-history-page/PurchasesHistoryPage';

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
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/products" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/user" render={() => <UserProfile />} />
          <Route exact path="/maintenance" render={() => <DataTable />} />
          <Route exact path="/maintenance/create" render={() => <Create />} />
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
          <Route exact path="/user/purchases" render={() => <PurchaseHistoryPage />} />
        </div>
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
