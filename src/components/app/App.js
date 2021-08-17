import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DataTable from '../productView/DataTable';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="page-container">
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/maintenance" render={() => <DataTable />} />
        {/* <Route exact path="/checkout" render={() => <CheckoutPage />} /> */}
        {/* <Route exact path="/confirmation" render={() => <ConfirmationPage />} />  */}
        {/* <Route exact path="/maintenance" render={() => <ProductList />} /> */}
      </Switch>
      {/* <ProductList /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  </div>
);

export default App;
