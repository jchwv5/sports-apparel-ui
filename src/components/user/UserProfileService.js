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
/**
 * @ userUpdate
 * @param {Long} id user id
 * @param {String} firstName user first name
 * @param {String} lastName user last name
 * @param {String} streetAddress user street address
 * @param {String} streetAddress2 user street address optional
 * @param {String} city user city
 * @param {String} state user state
 * @param {String} zipCode user zip code
 * @param {String} phoneNumber user phone number
 * @param {Function} setApiError useState function to set apiError if error occurs
 */
async function userUpdate(
  id,
  email,
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
  await HttpHelper(`${Constants.USER__UPDATE_BY_EMAIL_ENDPOINT}/${id}`, 'PUT', {
    id,
    email,
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
    });
}
export default { fetchUserInfo, userUpdate };
