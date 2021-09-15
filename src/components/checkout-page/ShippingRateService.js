import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchShippingRates
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setShippingRates sets state for shipping rates
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for shipping rates if 200 response, else sets state for apiError
 */

export default async function fetchShippingRates(setShippingRates, setApiError) {
  await HttpHelper(Constants.SHIPPING_RATES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((body) => {
      setShippingRates(body.reduce((map, Rate) => {
        const rates = map;
        rates[Rate.code] = Rate.rate;
        return rates;
      }, {}));
    })
    .catch(() => {
      setApiError(true);
    });
}
