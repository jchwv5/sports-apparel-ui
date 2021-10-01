import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function fetchPromoByCode(setPromotion, setPromoApiError, customerPromo) {
  await HttpHelper(`${Constants.PROMOTIONS_BY_CODE}${customerPromo}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPromotion)
    .catch(() => {
      setPromoApiError(true);
    });
}
