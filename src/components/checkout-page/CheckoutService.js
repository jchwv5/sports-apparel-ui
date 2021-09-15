/* eslint-disable no-console */
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
export default async function makePurchase(products, deliveryAddress, billingAddress, creditCard) {
  await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
    products,
    deliveryAddress,
    billingAddress,
    creditCard
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
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
