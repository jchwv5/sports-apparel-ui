export default function validate(values) {
  const errors = {};

  /* Delivery validation */
  /* Delivery First name validation */
  if (values.deliveryAddress.firstName === undefined || values.deliveryAddress.firstName === '') {
    errors.firstName = 'First name must be filled out';
  } else if (!/^[a-zA-Z]+$/.test(values.deliveryAddress.cardholder)) {
    errors.firstName = 'First name can only be alphabetic characters';
  }
  /* Delivery Last name validation */
  if (values.deliveryAddress.lastName === undefined || values.deliveryAddress.lastName === '') {
    errors.lastName = 'Last name must be filled out';
  } else if (!/^[a-zA-Z]+$/.test(values.deliveryAddress.cardholder)) {
    errors.lastName = 'Last name can only be alphabetic characters';
  }
  /* Delivery Street validation */
  if (values.deliveryAddress.street === undefined || values.deliveryAddress.street === '') {
    errors.deliveryStreet = 'Street must be filled out';
  } else if (!/^([1-zA-Z0-1@.\s]{1,255})$/.test(values.deliveryAddress.street)) {
    errors.deliveryStreet = 'Street can only contain numbers, letters and limited symbols';
  }
  /* Delivery State validation */
  if (values.deliveryAddress.state === undefined || values.deliveryAddress.state === '') {
    errors.deliveryState = 'State must be filled out';
  }
  /* Delivery City validation */
  if (values.deliveryAddress.city === undefined || values.deliveryAddress.city === '') {
    errors.deliveryCity = 'City must be filled out';
  } else if (!/^[a-zA-Z\s]+$/.test(values.deliveryAddress.city)) {
    errors.deliveryCity = 'City must be alphabetic characters only';
  }
  /* Delivery Zip validation */
  if (values.deliveryAddress.zip === undefined || values.deliveryAddress.zip === '') {
    errors.deliveryZip = 'Zip code must be filled out';
  } else if (!/^\d{5}$/.test(values.billingAddress.zip)) {
    errors.deliveryZip = 'Zip code is invalid';
  }

  /* Billing validation */
  /* Billing Street validation */
  if (values.billingAddress.street === undefined || values.billingAddress.street === '') {
    errors.billingStreet = 'Street must be filled out';
  } else if (!/^([1-zA-Z0-1@.\s]{1,255})$/.test(values.billingAddress.street)) {
    errors.billingStreet = 'Street can only contain numbers, letters and limited symbols';
  }
  /* Billing City validation */
  if (values.billingAddress.city === undefined || values.billingAddress.city === '') {
    errors.billingCity = 'City must be filled out';
  } else if (!/^[a-zA-Z\s]+$/.test(values.billingAddress.city)) {
    errors.billingCity = 'City must be alphabetic characters only';
  }
  /* Billing State validation */
  if (values.billingAddress.state === undefined || values.billingAddress.state === '') {
    errors.billingState = 'State must be filled out';
  }
  /* Billing Zip validation */
  if (values.billingAddress.zip === undefined || values.billingAddress.zip === '') {
    errors.billingZip = 'Zip code must be filled out';
  } else if (!/^\d{5}$/.test(values.billingAddress.zip)) {
    errors.billingZip = 'Zip code is invalid';
  }
  /* Billing Email validation */
  if (values.billingAddress.email === undefined || values.billingAddress.email === '') {
    errors.email = 'E-Mail field must be filled out';
  } else if (!/\S+@\S+\.\S+/.test(values.billingAddress.email)) {
    errors.email = 'Email address is invalid';
  }
  /* Billing Phone validation */
  if (values.billingAddress.phone === undefined || values.billingAddress.phone === '') {
    errors.phone = 'Phone field must be filled out';
  } else if (!/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(values.billingAddress.phone)) {
    errors.phone = 'Phone number must be only numbers and match the format(xxx-xxx-xxxx)';
  }
  /* Billing Credit Card number validaton */
  if (values.creditCard.cardNumber === undefined || values.creditCard.cardNumber === '') {
    errors.cardNumber = 'Credit card number must be filled out';
  } else if (!/^(\d{4}[- ]){3}\d{4}|\d{16}$/.test(values.creditCard.cardNumber)) {
    errors.cardNumber = 'Card provided is invalid';
  }
  /* Billing CVV validation */
  if (values.creditCard.cvv === undefined || values.creditCard.cvv === '') {
    errors.cvv = 'CVV Field must be filled out';
  } else if (!/^([0-9]{3,4})$/.test(values.creditCard.cvv)) {
    errors.cvv = 'CVV must be only numbers and have a length of 3 or 4';
  }
  /* Billing Expiration validation */
  if (values.creditCard.expiration === undefined || values.creditCard.expiration === '') {
    errors.expiration = 'Expiration date must be filled out';
  } else if (!/((\d{2})|(\d))\/((\d{2})|(\d))/.test(values.creditCard.expiration)) {
    errors.expiration = 'Expiration date must be in the proper format(DD/MM)';
  }
  /* Billing Cardholder validation */
  if (values.creditCard.cardholder === undefined || values.creditCard.cardholder === '') {
    errors.cardholder = 'Cardholder must be filled out';
  } else if (!/^[a-zA-Z\s]+$/.test(values.billingAddress.cardholder)) {
    errors.cardholder = 'Cardholder can only be alphabetic characters';
  }
  return errors;
}
