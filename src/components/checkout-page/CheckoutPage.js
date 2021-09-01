/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import validate from '../../utils/validate';
import notify from '../Toast/Toast';
import Spinner from '../Spinner/Spinner';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();
  const [, updateState] = useState();
  const [isLoading, setLoading] = useState(false);
  const [billingData, setBillingData] = React.useState({});
  const [deliveryData, setDeliveryData] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const [deliveryErrors, setDeliveryErrors] = React.useState({
    firstName: { dataIsValid: false, errorMessage: '' },
    lastName: { dataIsValid: false, errorMessage: '' },
    deliveryStreet: { dataIsValid: false, errorMessage: '' },
    deliveryCity: { dataIsValid: false, errorMessage: '' },
    deliveryState: { dataIsValid: false, errorMessage: '' },
    deliveryZip: { dataIsValid: false, errorMessage: '' }
  });
  const [billingErrors, setBillingErrors] = React.useState({
    billingStreet: { dataIsValid: false, errorMessage: '' },
    billingCity: { dataIsValid: false, errorMessage: '' },
    billingState: { dataIsValid: false, errorMessage: '' },
    billingZip: { dataIsValid: false, errorMessage: '' },
    email: { dataIsValid: false, errorMessage: '' },
    phone: { dataIsValid: false, errorMessage: '' },
    cardNumber: { dataIsValid: false, errorMessage: '' },
    cvv: { dataIsValid: false, errorMessage: '' },
    expiration: { dataIsValid: false, errorMessage: '' },
    cardholder: { dataIsValid: false, errorMessage: '' }
  });
  const {
    state: { products }
  } = useCart();

  const onDeliveryChange = (e) => {
    setDeliveryData((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
  };
  const onBillingChange = (e) => {
    setBillingData((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
  };
  const handleCheck = () => {
    setChecked(!checked);
  };

  /**
   * Supposed to force-update the state so it fixes the double-click bug but doesn't
   * do what I expected it to?
   */
  const forceUpdate = useCallback(
    () => {
      updateState({});
    },
    []
  );
  /**
   * Takes in three objects with the form data and sets that information to the state
   * and validates it at the same time.
   *
   * @param {Object} deliveryAddress - The data from the delivery fields related to address
   * and name
   * @param {Object} billingAddress - The data from the billing fields related to address
   * @param {Object} creditCard - The data from the billing fields related to the
   * credit card.
   */

  const verifyInfo = (deliveryAddress, billingAddress, creditCard) => {
    setDeliveryErrors({
      firstName: validate('text', 'First name', deliveryAddress.firstName),
      lastName: validate('text', 'Last name', deliveryAddress.lastName),
      deliveryStreet: validate('alphaNum', 'Delivery street', deliveryAddress.street),
      deliveryCity: validate('text', 'Delivery city', deliveryAddress.city),
      deliveryState: validate('drop-down', 'delivery state', deliveryAddress.state),
      deliveryZip: validate('zip', 'Delivery zip', deliveryAddress.zip)
    });
    setBillingErrors({
      billingStreet: validate('alphaNum', 'Billing street', billingAddress.street),
      billingCity: validate('text', 'Billing city', billingAddress.city),
      billingState: validate('drop-down', 'billing state', billingAddress.state),
      billingZip: validate('zip', 'Billing zip', billingAddress.zip),
      email: validate('email', 'E-mail', billingAddress.email),
      phone: validate('phone', 'Phone', billingAddress.phone),
      cardNumber: validate('credit-card', 'Credit card', creditCard.cardNumber),
      cvv: validate('cvv', 'CVV', creditCard.cvv),
      expiration: validate('date', 'Expiration', creditCard.expiration),
      cardholder: validate('text', 'Cardholder', creditCard.cardholder)
    });
    forceUpdate();
  };

  /**
   * Loops over deliveryInfo and billingInfo, pulling just the error booleans themselves
   * and puts them into array to interate through.
   *
   * @param {*} deliveryInfo - Object that holds the results of the verification to
   * go through and find out whether the form is valid or not
   * @param {*} billingInfo - Object that holds the results of the verification to
   * go through and find out whether the form is valid or not
   * @returns either true or false, depending on whether the data submitted has errors.
   */
  const hasErrors = (deliveryInfo, billingInfo) => {
    const errorList = [];

    Object.values(deliveryInfo).forEach((e) => {
      if (e.dataIsValid === false) {
        errorList.push(e.dataIsValid);
      }
    });
    Object.values(billingInfo).forEach((e) => {
      if (e.dataIsvalid === false) {
        errorList.push(e.dataIsValid);
      }
    });
    if (errorList.length > 0) return true;
    return false;
  };

  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ id, quantity }));
    const deliveryAddress = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      street: deliveryData.deliveryStreet,
      street2: deliveryData.deliveryStreet2,
      city: deliveryData.deliveryCity,
      state: deliveryData.deliveryState,
      zip: deliveryData.deliveryZip
    };
    const billingAddress = {};
    if (checked) {
      billingAddress.street = deliveryAddress.deliveryStreet;
      billingAddress.street2 = deliveryAddress.deliveryStreet2;
      billingAddress.city = deliveryAddress.deliveryCity;
      billingAddress.state = deliveryAddress.deliveryState;
      billingAddress.zip = deliveryAddress.deliveryZip;
    } else {
      billingAddress.street = billingData.billingStreet;
      billingAddress.street2 = billingData.billingStreet2;
      billingAddress.city = billingData.billingCity;
      billingAddress.state = billingData.billingState;
      billingAddress.zip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };

    verifyInfo(deliveryAddress, billingAddress, creditCard);
    // forceUpdate();
    if (hasErrors(deliveryErrors, billingErrors) === false) {
      makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(
        () => history.push('/confirmation')
      );
    } else {
      notify('error', 'There was a problem processing your payment, you have not been charged');
    }
  };

  return (
    <div className="checkoutContainer">
      <div className={styles.checkoutContainer}>
        <div className={`${styles.step} ${styles.order}`}>
          <h3 className={styles.title}>1. Review Order</h3>
          <ReviewOrderWidget />
        </div>
        <div className={`${styles.step} ${styles.delivery}`}>
          <h3 className={styles.title}>2. Delivery Address</h3>
          <DeliveryAddress
            onChange={onDeliveryChange}
            deliveryData={deliveryData}
            errorInfo={deliveryErrors}
          />
          <label htmlFor="useSame" className={styles.sameAddressText}>
            <div className={styles.useSameAddress}>
              <input
                id="useSame"
                onChange={handleCheck}
                type="checkbox"
                value={checked}
              />
            </div>
            Same Billing Address
          </label>
        </div>
        <div className={`${styles.step} ${styles.payment}`}>
          <h3 className={styles.title}>3. Billing Details</h3>
          <BillingDetails
            onChange={onBillingChange}
            billingData={billingData}
            useShippingForBilling={checked}
            errorInfo={billingErrors}
          />
        </div>

        <div className={styles.payNow}>
          <span>
            {isLoading ? <Spinner /> : null }
          </span>
          <br />
          <button
            onClick={() => {
              setLoading(true); setTimeout(() => {
                setLoading(false);
                handlePay();
              });
            }}
            type="button"
            className={styles.payButton}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
