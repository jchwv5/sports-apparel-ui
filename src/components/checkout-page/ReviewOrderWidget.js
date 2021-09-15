import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal, getShippingSubtotal } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({ shippingSubtotal, apiError }) => {
  const {
    state: { products }
  } = useCart();

  const [productsInCart, setProductsInCart] = useState(true);

  useEffect(() => {
    if (products.length === 0) {
      setProductsInCart(false);
    }
  }, [products]);

  return (
    <>
      {!productsInCart && (
        <>
          <h4>Your Cart is empty</h4>
          <Link to="/">Click Here to continue shopping!</Link>
        </>
      )}

      {products.map(({
        price, title, description, quantity, image
      }) => (
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
          image={image}
        />
      ))}

      {productsInCart && (
        <>
          <hr />
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal</p>
            </div>
            <div className={styles.price}>
              <p>{getSubtotal(products)}</p>
            </div>
          </div>

          <div className={styles.subtotal}>
            <div>
              <p>Shipping</p>
            </div>
            <div className={styles.price}>
              {!apiError && <p>{getShippingSubtotal(shippingSubtotal)}</p>}
              {apiError && (
                <p className={styles.errMsg}>Error</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewOrderWidget;
