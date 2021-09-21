/* eslint-disable no-console */
import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
export default async function makePurchase(products, deliveryAddress, billingAddress, creditCard,
  setApiError) {
  await HttpHelper(constants.PURCHASE_ENDPOINT, 'POST', {
    products,
    deliveryAddress,
    billingAddress,
    creditCard
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
};
