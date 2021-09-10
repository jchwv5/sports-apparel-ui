/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  const [filterParam, setFilterParam] = useState('Men');
  const [filteredProducts, setFilteredProducts] = useState([]);

  function handleClick(filter) {
    setFilterParam(filter);
  }
  /**
 * Filters all products into a separate array based on filterParam
 * to be returned for setting cards on products page
 * @param {*} el - product passed in to be filtered
 * @returns filteredProducts array
 */
  const filterProducts = (el) => {
    if (filterParam === 'All') {
      filteredProducts.push(el);
      return filteredProducts.setFilteredProducts;
    } if (el.demographic === filterParam) {
      filteredProducts.push(el);
    }
    return filteredProducts.setProducts;
  };
  /**
   * empties the filteredProducts array so that it can be populated from a clean state
   * whenever the filterProducts function is called
   * @returns empty filteredProducts array
   */
  const clearFilteredProducts = () => {
    while (filteredProducts.length > 0) {
      filteredProducts.pop();
    }
    return filteredProducts;
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.js" />;
    return (
      <div>
        {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <Sidebar filterParam={filterParam} onClick={() => handleClick} products={products} />
        <div id="productCards" className={styles.app}>
          {clearFilteredProducts()}
          {products.filter(filterProducts)}
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default ProductPage;
