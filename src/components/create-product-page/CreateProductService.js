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
 * @name productPost
 * @description Utilizes HttpHelper to make a POST request to an API
 * @param {String} name - product name
 * @param {String} description - product description
 * @param {String} demographic - product deomographic
 * @param {String} category - product category
 * @param {String} type - product type
 * @param {String} brand - product brand
 * @param {String} material - product material
 * @param {Number} price - product price
 * @param {Boolean} active - active status of product
 * @param {Function} setApiError - useState function to set apiError if error occurs
 * @returns response if POST is successfull with a toast, or error toast if failure
 */
async function productPost(name,
  description,
  demographic,
  category,
  type,
  brand,
  material,
  price,
  active,
  setApiError) {
  await HttpHelper(Constants.ALL_PRODUCTS_ENDPOINT, 'POST', {
    name,
    description,
    demographic,
    category,
    type,
    brand,
    material,
    price,
    active
  })
    .then((response) => {
      if (response.ok) {
        notify('success', 'Product created successfully');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      notify('error', 'A database connection error occured');
      setApiError(true);
    });
}

export default { fetchCategories, fetchTypes, productPost };
