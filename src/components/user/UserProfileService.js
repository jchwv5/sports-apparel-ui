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
async function fetchUserInfo(setUserInfo, setApiError, email) {
  await HttpHelper(Constants.USER_BY_EMAIL_ENDPOINT + email, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setUserInfo)
    .catch(() => {
      setApiError(true);
    });
}

async function userUpdate(
  firstName,
  lastName,
  streetAddress,
  streetAddress2,
  city,
  state,
  zipCode,
  phoneNumber,
  setApiError
) {
  await HttpHelper(Constants.USER__UPDATE_BY_EMAIL_ENDPOINT, 'PUT', {
    firstName,
    lastName,
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode,
    phoneNumber,
    setApiError
  })
    .then((response) => {
      if (response.ok) {
        notify('success', 'User updated successfully');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      notify('error', 'A database connection error occured, user not updated.');
      setApiError(true);
    });
}
export default { fetchUserInfo, userUpdate };
