import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchPurchase
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPurchase sets state for purchases
 * @param {*} setApiError sets error response if anything other than 200 is returned
 * @returns sets state for purchases for a 200 response, else sets state for apiError
 */
export default async function fetchPurchase(setPurchase, setApiError, email) {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT + email, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setPurchase)
    .catch(() => {
      setApiError(true);
    });
}
