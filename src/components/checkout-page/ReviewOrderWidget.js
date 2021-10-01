/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import {
  getSubtotal, getShippingSubtotal, getTaxTwoDigitsPlace, getTotalChargesTwoDigitsPlace,
  findDiscount
} from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';
import fetchPromoByCode from './PromoCodeService';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({
  shippingSubtotal, taxTotal, apiError, totalCharges, setChargeDiscount
}) => {
  const {
    state: { products }
  } = useCart();

  const [productsInCart, setProductsInCart] = useState(true);
  const [promotion, setPromotion] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [promoApiError, setPromoApiError] = useState(false);
  const [customerPromo, setCustomerPromo] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [promoError, setPromoError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (products.length === 0) {
      setProductsInCart(false);
    }
  }, [products]);

  /**
   * sets customerPromo to user-entered value
   * @param {*} e
   */
  const handleChange = (e) => {
    setCustomerPromo(e.target.value);
  };

  /**
   * on click of Apply button, resets all promotion-related values, then runs fetchPromoByCode
   */
  const handleClick = () => {
    setPromoApiError(false);
    setDiscount(0);
    setChargeDiscount(0);
    setPromotion({});
    fetchPromoByCode(setPromotion, setPromoApiError, customerPromo);
  };

  /**
   * ensures that discount state is updated following fetchPromoByCode
   * (Note: removing or altering this useEffect causes feature-breaking bugs in
   * discount state)
   */
  useEffect(() => {
    if (promotion.type) {
      findDiscount(products, promotion.type, promotion.amount, setDiscount, setChargeDiscount);
    }
  }, [products, promotion, setChargeDiscount]);

  return (
    <>
      {!productsInCart && (
        <>
          <h4>Your Cart is empty</h4>
          <Link to="/">Click Here to continue shopping!</Link>
        </>
      )}

      {products.map(({
        id, price, title, description, quantity, image
      }) => (

        <>

          <OrderItem
            key={title}
            price={price}
            title={title}
            description={description}
            quantity={quantity}
            image={image}
            id={id}
          />
        </>
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
          <div className={styles.subtotal}>
            <div>
              <p>Tax</p>
            </div>
            <div className={styles.price}>
              {!apiError && <p>{getTaxTwoDigitsPlace(taxTotal)}</p>}
              {apiError && (
                <p className={styles.errMsg}>Error</p>
              )}
            </div>
          </div>
          <div className={styles.subtotal}>
            <span className={styles.promofield}>
              <input placeholder="Enter Valid Promo Code" id={styles.promofield} type="text" onChange={handleChange} />
              <button disabled={!customerPromo} className={styles.applyButton} type="submit" onClick={handleClick.bind(this)}>Apply</button>
            </span>
            <span>
              {promotion.type && (
              <div>
                <div className={styles.success}>
                  ✓
                </div>
                <p className={styles.discount}>
                  Discount:
                  -$
                  {discount}
                </p>
              </div>
              )}
              {promoApiError === true && (
              <p id="errorMsg" className={styles.errMsg}>Promo Code Not Found</p>
              )}
            </span>
            <div>
              <p>Total To Pay</p>
            </div>
            <div className={styles.price}>
              {!apiError && <p>{getTotalChargesTwoDigitsPlace(totalCharges, discount)}</p>}
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
