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

  const filterProducts = (el) => {
    if (filterParam === 'All') {
      return products.setProducts;
    } if (el.demographic !== filterParam) {
      const index = products.indexOf(el);
      products.splice(index, 1);
    }
    return products.setProducts;
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError, setFilterParam);
  }, []);
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.js" />;
    return (
      <div>
        {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <Sidebar />
        <div className={styles.app}>
          {products.filter(filterProducts)}
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default ProductPage;
