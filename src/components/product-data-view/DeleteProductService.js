import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 * Handles the request to the endpoint on the backend to delete the product
 * with the matching product id
 * @name deleteProductById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} id The ID for the product that is to be deleted.
 * @returns Sends toast notifcation if it succeeds, else sets state for apiError
 */
async function deleteProductById(setApiError, id) {
  await HttpHelper(Constants.DELETE_PRODUCT_BY_ID_ENDPOINT + id, 'DELETE')
    .then((response) => {
      if (response.ok) {
        return notify('success', 'Product has been successfully deleted');
      }
      notify('error', 'There was an problem deleting the product');
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}

export default deleteProductById;
