import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <ProductPage />} />
    </Switch>
  </BrowserRouter>
);

export default App;
