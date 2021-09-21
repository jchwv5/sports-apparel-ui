import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 *
 * @name postPromotions
 * @description Utilizes HttpHelper to make a post request to an API
 * @param {*} code, promotion titile
 * @param {*} type, promotions type
 * @param {*} amount, discount amount
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for promotions if 200 response, else sets state for apiError
 */
export default async function postPromotions(code, type, amount, setApiError) {
  await HttpHelper(constants.PRODUCTS_PROMOTIONS_ENDPOINT, 'POST', {
    code,
    type,
    amount
  })
    .then((response) => {
      if (response.ok) {
        notify('success', 'Promotion created successfully');
        return response.json();
      }
      const result = response.status;
      if (result === 409) {
        notify('error', 'Error! Promo code already exists');
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}
