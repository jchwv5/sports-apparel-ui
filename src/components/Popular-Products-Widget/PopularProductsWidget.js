import React, { useState, useEffect } from 'react';
import fetchPopularProducts from './PopularProductsWidgetService';
import Constants from '../../utils/constants';
import styles from './PopularProductsWidget.module.css';
import ProductCard from '../product-card/ProductCard';

/**
 * sets the state for popular products
 *
 * @returns popular products
 */
const PopularProductsWidget = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchPopularProducts(setPopularProducts, setApiError);
  }, []);
  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div className={styles.card}>
        {popularProducts.map((product) => (
          <div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProductsWidget;
