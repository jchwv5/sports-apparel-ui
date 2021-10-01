module.exports = Object.freeze({
  ACTIVE_PRODUCTS_PAGINATED: '/products/page/',
  ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true',
  ALL_PRODUCTS_ENDPOINT: '/products',
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'https://fo4s-sports-apparel-api.herokuapp.com',
  // BASE_URL_API: 'http://localhost:8085',
  CALCULATE_TOTAL_CHARGES: '/purchases/calculateTotalCharges',
  CREATE_PRODUCT_ENDPOINT: '/maintenance/create',
  DELETE_PRODUCT_BY_ID_ENDPOINT: '/products/delete/',
  KIDS_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Kids',
  MEN_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Men',
  POPULAR_PRODUCTS_ENDPOINT: '/products/popular',
  PRODUCT_CATEGORIES_ENDPOINT: '/products/categories',
  PRODUCT_TYPES_ENDPOINT: '/products/types',
  PRODUCTS_PROMOTIONS_ENDPOINT: '/products/promotions',
  PROMO_PRODUCTS_ENDPOINT: '/products/promo',
  PURCHASE_ENDPOINT: '/purchases',
  PURCHASE_BY_EMAIL_ENDPOINT: '/purchases?email=',
  PURCHASE_BY_PRODUCT_ID_ENDPOINT: '/purchases/product/?id=',
  RUNNING_SHORTS_ENDPOINT: '/products?category=Running&type=Short',
  SAVE_PURCHASE_ENDPOINT: '/purchases',
  SEARCH_PRODUCTS_ENDPOINT: '/products?search=',
  SHIPPING_RATES_ENDPOINT: '/rates/type?t=shipping',
  USER_BY_EMAIL_ENDPOINT: '/users?email=',
  USER__UPDATE_BY_EMAIL_ENDPOINT: '/users',
  WOMEN_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Women',

  PLACEHOLDER_IMAGE:
    'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PROMOTIONS_BY_CODE: '/products/promotions/',

  GOOGLE_CLIENT_ID: '617323905633-81rrdqv26b283cs2rb9mqddbucmm23eo.apps.googleusercontent.com' // ENTER CLIENT ID HERE
});
