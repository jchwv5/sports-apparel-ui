import constants from '../../utils/constants';
import HttpHelper from '../../utils/HttpHelper';
import notify from '../Toast/Toast';

export default async function makeProduct(obj) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', obj)
    .then((response) => notify('info', response.message))
    .catch((response) => {
      notify('info', response.message);
    });
}
