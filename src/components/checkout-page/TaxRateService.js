import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function fetchTotalCharges(
  setTaxTotal, setTaxRate, deliveryState, setTotalCharges, products, setApiError, setTotal
) {
  await HttpHelper(Constants.CALCULATE_TOTAL_CHARGES, 'POST', {
    products,
    deliveryState
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'taxRate') {
          setTaxRate(value / 100);
        }
        if (key === 'taxTotal') {
          setTaxTotal(value);
        }
        if (key === 'totalCharges') {
          setTotalCharges(value);
        }
        if (key === 'total') {
          setTotal(value);
        }
      });
    })
    .catch(() => {
      setApiError(true);
    });
}
