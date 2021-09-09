/* eslint-disable max-len */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
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
  const {
    state: { products }
  } = useCart();

  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker();

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
  * Loops over the errors provided and pulls the boolean for whether the data is validated. If it fails, it returns true otherwise it returns false if the information is all valid.
  *
  * @param {*} errorInfo - Object that holds the results of the verification to go through and find out whether the form is valid or not.
  * @returns either true or false, depending on whether the data submitted has errors.
  */
  const hasErrors = (errorInfo) => {
    const errorList = [];

    Object.values(errorInfo).forEach((e) => {
      if (e.dataIsValid === false) {
        errorList.push(e.dataIsValid);
      }
    });
    if (errorList.length > 0) return true;
    return false;
  };
  /**
   * Takes in three objects, runs the validate function on all the values from the form inside of the objects and then sets them to the state and passes
   * the actual objects themselves back to handlePay so it can run hasErrors on it to check for any problems with the form itself.
   *
   * @param {Object} deliveryAddress - The data from the delivery fields related to address
   * and name
   * @param {Object} billingAddress - The data from the billing fields related to address
   * @param {Object} creditCard - The data from the billing fields related to the
   * credit card.
   */
  const verifyInfo = (deliveryAddress, billingAddress, creditCard) => {
    const statelessDeliveryErrors = {
      ...deliveryErrors,
      firstName: validate('text', 'First name', deliveryAddress.firstName),
      lastName: validate('text', 'Last name', deliveryAddress.lastName),
      deliveryStreet: validate('alphaNum', 'Delivery street', deliveryAddress.deliveryStreet),
      deliveryCity: validate('text', 'Delivery city', deliveryAddress.deliveryCity),
      deliveryState: validate('drop-down', 'delivery state', deliveryAddress.deliveryState),
      deliveryZip: validate('zip', 'Delivery zip', deliveryAddress.deliveryZip)
    };
    const statelessBillingErrors = {
      ...billingErrors,
      billingStreet: validate('alphaNum', 'Billing street', billingAddress.billingStreet),
      billingCity: validate('text', 'Billing city', billingAddress.billingCity),
      billingState: validate('drop-down', 'billing state', billingAddress.billingState),
      billingZip: validate('zip', 'Billing zip', billingAddress.billingZip),
      email: validate('email', 'E-mail', billingAddress.email),
      phone: validate('phone', 'Phone', billingAddress.phone),
      cardNumber: validate('credit-card', 'Credit card', creditCard.cardNumber),
      cvv: validate('cvv', 'CVV', creditCard.cvv),
      expiration: validate('date', 'Expiration', creditCard.expiration),
      cardholder: validate('text', 'Cardholder', creditCard.cardholder)
    };

    setDeliveryErrors(statelessDeliveryErrors);
    setBillingErrors(statelessBillingErrors);

    return { statelessDeliveryErrors, statelessBillingErrors };
  };

  /**
   * The handlePay function is called when checkout is clicked. It packs up the relevant info to be both validated and then sent to the API when successfully validated. If the info
   * is not valid, it will refuse the transaction and send a toast message to the user depending on why it failed.
   */
  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ quantity, id }));
    const deliveryAddress = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      deliveryStreet: deliveryData.deliveryStreet,
      deliveryStreet2: deliveryData.deliveryStreet2,
      deliveryCity: deliveryData.deliveryCity,
      deliveryState: deliveryData.deliveryState,
      deliveryZip: deliveryData.deliveryZip
    };
    const billingAddress = {};
    if (checked) {
      billingAddress.billingStreet = deliveryData.deliveryStreet;
      billingAddress.billingStreet2 = deliveryData.deliveryStreet2;
      billingAddress.billingCity = deliveryData.deliveryCity;
      billingAddress.billingState = deliveryData.deliveryState;
      billingAddress.billingZip = deliveryData.deliveryZip;
    } else {
      billingAddress.billingStreet = billingData.billingStreet;
      billingAddress.billingStreet2 = billingData.billingStreet2;
      billingAddress.billingCity = billingData.billingCity;
      billingAddress.billingState = billingData.billingState;
      billingAddress.billingZip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };
    const {
      statelessDeliveryErrors,
      statelessBillingErrors
    } = verifyInfo(deliveryAddress, billingAddress, creditCard);

    const hasBillingErrors = hasErrors(statelessBillingErrors);
    const hasDeliveryErrors = hasErrors(statelessDeliveryErrors);

    if ((!hasBillingErrors && !hasDeliveryErrors) && productData.length > 0) {
      trackPromise(
        makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(
          () => history.push('/confirmation')
        )
      );
    } else {
      notify('error', 'There was a problem processing your payment, you have not been charged');
      if (productData.length === 0) notify('error', 'You must have items in your cart to make a purchase');
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
          <br />
          <br />
          <span className={styles.span}>
            {(promiseInProgress === true) ? <Spinner /> : null}
          </span>
          <button
            onClick={handlePay}
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
