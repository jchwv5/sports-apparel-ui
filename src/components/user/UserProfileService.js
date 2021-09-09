import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

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
export default async function fetchUserInfo(setUserInfo, setApiError, email) {
  await HttpHelper(constants.USER_BY_EMAIL_ENDPOINT + email, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setUserInfo)
    .catch(() => {
      setApiError(true);
    });
}
