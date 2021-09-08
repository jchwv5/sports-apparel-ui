/**
 *
 * @name validate
 * @description validates required fields of a form
 * @param {String} type - field type (text, currency, drop-down)
 * @param {String} name - to be displayed in the error toast
 * @param {String} data - value of the form field
 * @returns boolean whether the field is valid, error message if any in the form of an array.
 */
const currencyRegex = /^\$?\d+(?:\.\d\d)$/;
const alphaRegex = /^[a-zA-Z\s]+$/;
const alphaNumRegex = /^([1-zA-Z0-1@.\s]{1,255})$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^([0-9]{3,4})$/;
const dateRegex = /((\d{2})|(\d))\/((\d{2})|(\d))/;
const cardRegex = /^(\d{4}[- ]){3}\d{4}|\d{16}$/;
const phoneRegex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
const emailRegex = /\S+@\S+\.\S+/;

const validate = (type, name, data) => {
  let isDataValid = true;
  let errorMsg = '';
  switch (type) {
    case 'text':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(alphaRegex).test(data)) {
        isDataValid = false;
        errorMsg = `${name} should be letters only`;
      }
      break;
    case 'description':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      }
      break;
    case 'phone':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(phoneRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} should be numbers only, and in the proper format ( (XXX)-XXX-XXXX)`;
      }
      break;
    case 'email':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(emailRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} is invalid`;
      }
      break;
    case 'credit-card':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(cardRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} provided is invalid`;
      }
      break;
    case 'date':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(dateRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} must be in the proper format (DD/MM)`;
      }
      break;
    case 'currency':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(currencyRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} should be in dollars and cents`;
      }
      break;
    case 'cvv':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(cvvRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} should be 3-4 digits`;
      }
      break;
    case 'drop-down':
      if (!data || data.charAt(0) === '[') {
        errorMsg = `Please select a ${name} from the drop down`;
        isDataValid = false;
      }
      break;
    case 'zip':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(zipRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} field must be 5 numbers`;
      }
      break;
    case 'alphaNum':
      if (!data || data.trim() === '') {
        isDataValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!(alphaNumRegex.test(data))) {
        isDataValid = false;
        errorMsg = `${name} field should be alphabetic or numeric`;
      }
      break;
    default:
      isDataValid = false;
      errorMsg = `No data provided for ${name} field`;
      break;
  }

  return {
    dataIsValid: isDataValid,
    errorMessage: errorMsg
  };
};

export default validate;
