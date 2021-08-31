/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

  const [errors, setErrors] = useState({});

  const {
    state: { products }
  } = useCart();

  const [billingData, setBillingData] = React.useState({});

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const [deliveryData, setDeliveryData] = React.useState({});

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };
  const [isLoading, setLoading] = useState(false);
  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ id, quantity }));
    let formIsValid = false;
    let errorCount = 0;
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
    setErrors({
      firstName: validate('text', 'First name', deliveryAddress.firstName),
      lastName: validate('text', 'Last name', deliveryAddress.lastName),
      deliveryStreet: validate('alphaNum', 'Delivery street', deliveryAddress.street),
      deliveryCity: validate('text', 'Delivery city', deliveryAddress.city),
      deliveryState: validate('drop-down', 'delivery state', deliveryAddress.state),
      deliveryZip: validate('zip', 'Delivery zip', deliveryAddress.zip),
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
    Object.values(errors).forEach((e) => {
      if (!e[0]) {
        // eslint-disable-next-line no-plusplus
        errorCount++;
      }
    });
    if (errorCount === 0) formIsValid = true;
    if (formIsValid) {
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
            errors={errors}
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
            errors={errors}
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
              }, 5000);
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
