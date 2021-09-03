import notify from '../components/Toast/Toast';

/**
 *
 * @name validate
 * @description validates required fields of a form
 * @param {String} type - field type (text, currency, drop-down)
 * @param {String} name - to be displayed in the error toast
 * @param {String} data - value of the form field
 * @returns boolean if the field is valid
 */
const validate = (type, name, data) => {
  let dataIsValid = true;
  switch (type) {
    case 'text':
      if (!data) {
        dataIsValid = false;
        notify('error', `${name} field must not be left empty`);
      }
      break;
    case 'currency':
      if (!data || data.trim() === '') {
        dataIsValid = false;
        notify('error', `${name} field must not be left empty`);
      } else if (!((/^\$?\d+(?:\.\d\d)$/).test(data))) {
        dataIsValid = false;
        notify('error', `${name} should be in dollars and cents`);
      }
      break;
    case 'drop-down':
      if (!data || data.charAt(0) === '[') {
        notify('error', `Please select a ${name} from the drop down`);
        dataIsValid = false;
      }
      break;
    default:
      dataIsValid = false;
      notify('error', `No data provided for ${name} field`);
      break;
  }

  return (dataIsValid);
};

export default validate;
