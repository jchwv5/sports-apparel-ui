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
