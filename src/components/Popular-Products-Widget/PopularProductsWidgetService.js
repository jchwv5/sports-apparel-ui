import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchPopularProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPopularProducts sets state for popular products
 * @param {*} setApiError sets error if response is not  200
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchPopularProducts(setPopularProducts, setApiError) {
  await HttpHelper(constants.POPULAR_PRODUCTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setPopularProducts)
    .catch(() => {
      setApiError(true);
    });
}
