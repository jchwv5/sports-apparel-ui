import notify from '../components/Toast/Toast';

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
