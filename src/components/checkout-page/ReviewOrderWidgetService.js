/**
 * converts a price to a formatted string
 * @param {number} price
 * @returns {string} formatted price
 */
export const toPrice = (price) => `$${price.toFixed(2)}`;

/**
 * Gets the subtotal of an order
 * @param {Object []} products
 * @returns Number
 */
export const getSubtotal = (products) => {
  if (products.length) {
    return toPrice(products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    ));
  }
  return toPrice(0.00);
};

export const getShippingSubtotal = (shippingSubtotal) => {
  if (shippingSubtotal === 0) {
    return (`Free Shipping\u00A0\u00A0\u00A0\u00A0\u00A0-\u00A0\u00A0\u00A0\u00A0\u00A0${toPrice(shippingSubtotal)}`);
  }
  return toPrice(shippingSubtotal);
};

export const getTaxTwoDigitsPlace = (taxTotal) => `$${taxTotal.toFixed(2)}`;

export const getTotalChargesTwoDigitsPlace = (totalCharges, discount) => `$${(totalCharges - discount).toFixed(2)}`;

/**
 * parses the amount and type of currently applied promotion to determine the actual numerical
 * value of the discount to be applied, then applies that value to the ui-side discount state
 * and the api-side chargeDiscountstate
 * @param {*} products products in cart
 * @param {*} type promotion type (flat or percentage)
 * @param {*} amount promotion amount
 * @param {*} setDiscount sets ui-side discount state to reflect the factored disocunt
 * @param {*} setChargeDiscount sets the api-side discount state to reflect the factored discount
 */
export const findDiscount = (products, type, amount, setDiscount, setChargeDiscount) => {
  if (type === 'Flat') {
    setDiscount(Number(amount).toFixed(2));
    setChargeDiscount(Number(amount).toFixed(2));
  } if (type === 'Percentage') {
    const subtotal = getSubtotal(products);
    const percent = (amount / 100);
    setDiscount((subtotal.substring(1) * percent).toFixed(2));
    setChargeDiscount((subtotal.substring(1) * percent).toFixed(2));
  }
};
