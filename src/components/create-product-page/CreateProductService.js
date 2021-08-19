import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import notify from '../Toast/Toast';

/**
 *
 * @name fetchCategories
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setCategories sets state for categories
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for categories if 200 response, else sets state for apiError
 */
async function fetchCategories(setCategories, setApiError) {
  await HttpHelper(Constants.PRODUCT_CATEGORIES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setCategories)
    .catch(() => {
      setApiError(true);
    });
}

/**
 *
 * @name fetchTypes
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setCategories sets state for types
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for types if 200 response, else sets state for apiError
 */
async function fetchTypes(setTypes, setApiError) {
  await HttpHelper(Constants.PRODUCT_TYPES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setTypes)
    .catch(() => {
      setApiError(true);
    });
}

/**
 *
 * @name createProduct
 * @description sends a request to create a new product
 * @param {*} payload product to be saved
 * @returns product creation confirmation response
 */
async function productPost(name,
  description,
  demographic,
  category,
  type,
  brand,
  material,
  price,
  activeStatus) {
  await HttpHelper(Constants.ALL_PRODUCTS_ENDPOINT, 'POST', {
    name,
    description,
    demographic,
    category,
    type,
    brand,
    material,
    price,
    activeStatus
  })
    .then((response) => {
      response.json();
    })
    .catch(() => {
      notify('error', Constants.API_ERROR);
    });
}

export default { fetchCategories, fetchTypes, productPost };
