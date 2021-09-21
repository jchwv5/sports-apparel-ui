module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  // BASE_URL_API: 'https://fo4s-sports-apparel-api.herokuapp.com',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE:
    'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PURCHASE_ENDPOINT: '/purchases',
  SAVE_PURCHASE_ENDPOINT: '/purchases',
  PURCHASE_BY_EMAIL_ENDPOINT: '/purchases?email=',
  ALL_PRODUCTS_ENDPOINT: '/products',
  USER_BY_EMAIL_ENDPOINT: '/users?email=',
  PRODUCTS_PROMOTIONS_ENDPOINT: '/products/promotions',
  ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true',
  CREATE_PRODUCT_ENDPOINT: '/maintenance/create',
  PRODUCT_CATEGORIES_ENDPOINT: '/products/categories',
  PRODUCT_TYPES_ENDPOINT: '/products/types',
  MEN_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Men',
  WOMEN_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Women',
  KIDS_ACTIVE_PRODUCTS_ENDPOINT: '/products?active=true&demographic=Kids',
  RUNNING_SHORTS_ENDPOINT: '/products?category=Running&type=Short',
  USER__UPDATE_BY_EMAIL_ENDPOINT: '/users',
  SHIPPING_RATES_ENDPOINT: '/rates/type?t=shipping',
  ACTIVE_PRODUCTS_PAGINATED: '/products/page/',

  GOOGLE_CLIENT_ID: '617323905633-81rrdqv26b283cs2rb9mqddbucmm23eo.apps.googleusercontent.com' // ENTER CLIENT ID HERE
});
