/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Component } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import Sidebar from '../sidebar/Sidebar';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [filterParam, setFilterParam] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  function handleClick(filter) {
    setFilterParam(filter);
  }

  const filterProducts = (el) => {
    if (filterParam === 'All') {
      filteredProducts.push(el);
      return filteredProducts.setFilteredProducts;
    } if (el.demographic === filterParam) {
      filteredProducts.push(el);
    }
    return filteredProducts.setProducts;
  };

  const clearFilteredProducts = () => {
    while (filteredProducts.length > 0) {
      filteredProducts.pop();
    }
    return filteredProducts;
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
<<<<<<< HEAD
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.js" />;
    return (
      <div>
        {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <Sidebar filterParam={filterParam} onClick={handleClick} />
        <div className={styles.app}>
          {clearFilteredProducts()}
          {products.filter(filterProducts)}
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
=======

  return (
    <div className="mainbody">
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
>>>>>>> sprint2
      </div>
    );
};

export default ProductPage;
