/* eslint-disable no-console */

import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';
import notify from '../Toast/Toast';
import fetchTotalCharges from './TaxRateService';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */

// shippingSubtotal
export default async function makePurchase(products, deliveryAddress,
  billingAddress, creditCard, taxTotal, totalCharges, shippingSubtotal,
  setApiError, total) {
  await HttpHelper(constants.PURCHASE_ENDPOINT, 'POST', {
    products,
    deliveryAddress,
    billingAddress,
    creditCard,
    taxTotal,
    totalCharges,
    shippingSubtotal,
    total
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 422) {
        notify('error', 'Error. One or more of your products is inactive!');
      }
      if (response.status === 400) {
        notify('error', 'Error. Purchase not successful.');
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}

export const getDeliverySubtotal = (
  setShippingSubtotal,
  shippingRates,
  deliveryState,
  products
) => {
  let deliverySubtotal = 0.00;
  if (deliveryState === 'Alaska' || deliveryState === 'Hawaii') {
    deliverySubtotal += shippingRates.extended;
  } else {
    deliverySubtotal = 0.00;
  }
  if (products.length) {
    if (products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    ) <= 50) {
      deliverySubtotal += shippingRates.base;
    }
  }
  setShippingSubtotal(deliverySubtotal);
  console.log(`mike's' ${deliverySubtotal}`);
  return deliverySubtotal;
};

export const getCartSubtotal = (
  setTotalCharges,
  shippingSubtotal,
  products,
  setTotal

) => {
  let cartSubTotal = 0;
  if (products.length) {
    cartSubTotal = products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    );
  }
  const totalCharges = cartSubTotal + shippingSubtotal;
  setTotal(cartSubTotal);
  setTotalCharges(totalCharges);
};

export const getTotalCharges = (
  setTaxTotal,
  setTaxRate,
  deliveryState,
  setTotalCharges,
  products,
  setApiError,
  setTotal
) => {
  fetchTotalCharges(setTaxTotal, setTaxRate, deliveryState, setTotalCharges,
    products, setTotal, setApiError);
};
