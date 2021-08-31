import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 *
 * @name postPromotions
 * @description Utilizes HttpHelper to make a post request to an API
 * @param {*} title, title for promotions
 * @param {*} code, title for promotions
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for promotions if 200 response, else sets state for apiError
 */
export default async function postPromotions(title, code, setApiError) {
  await HttpHelper(constants.PRODUCTS_PROMOTIONS_ENDPOINT, 'POST', {
    title,
    code
  })
    .then((response) => {
      if (response.ok) {
        notify('success', 'Promotion created successfully');
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      notify('error', 'Promotion not created');
      setApiError(true);
    });
}
