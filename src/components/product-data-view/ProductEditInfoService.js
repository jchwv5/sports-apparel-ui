import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name updateProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setUpdatedProducts updates products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns updates state for products if 200 response, else sets state for apiError
 */
export default async function updateProducts(updatedProducts, setApiError) {
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'PUT', updatedProducts)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}
