/**
 *
 * @name validate
 * @description validates required fields of a form
 * @param {String} type - field type (text, currency, drop-down)
 * @param {String} name - to be displayed in the error toast
 * @param {String} data - value of the form field
 * @returns boolean whether the field is valid, error message if any in the form of an array.
 */
const validate = (type, name, data) => {
  let dataIsValid = true;
  let errorMsg = '';
  switch (type) {
    case 'text':
      if (!data || data.trim() === '') {
        dataIsValid = false;
        errorMsg = `${name} field must not be left empty`;
      }
      break;
    case 'currency':
      if (!data || data.trim() === '') {
        dataIsValid = false;
        errorMsg = `${name} field must not be left empty`;
      } else if (!((/^\$?\d+(?:\.\d\d)$/).test(data))) {
        dataIsValid = false;
        errorMsg = `${name} should be in dollars and cents`;
      }
      break;
    case 'drop-down':
      if (!data || data.charAt(0) === '[') {
        errorMsg = `Please select a ${name} from the drop down`;
        dataIsValid = false;
      }
      break;
    default:
      dataIsValid = false;
      errorMsg = `No data provided for ${name} field`;
      break;
  }

  return [dataIsValid, errorMsg];
};

export default validate;
