import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 * Handles the request to the endpoint on the backend to fetch the user information from
 * the database with matching email
 * @name fetchUserInfo
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setUserInfo sets state for the userInfo
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} email The email to check the database for the users
 * @returns sets state for userInfo if 200 response, else sets state for apiError
 */
async function deleteProductById(setApiError, id) {
  await HttpHelper(Constants.DELETE_PRODUCT_BY_ID_ENDPOINT + id, 'DELETE')
    .then((response) => {
      if (response.ok) {
        return notify('success', 'Product has been successfully deleted');
      }
      notify('error', 'There was an error deleting the product');
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}

export default deleteProductById;
