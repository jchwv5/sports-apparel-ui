import jwtDecode from 'jwt-decode';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name loginUser
 * @description Sends a login request to the backend to log user in.
 * If successful, saves jwtToken and user info to cookie
 * @param {Object} googleUser The googleUser object
 * @param {Function} setUser Sets the user
 * @param {Function} setApiError Sets the Api Error
 */
const loginUser = (googleUser, setUser, setApiError) => {
  HttpHelper('/users/login', 'POST', googleUser)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((response) => {
      const payload = jwtDecode(response.jwtToken);
      setUser(payload.user);
      document.cookie = `user=${JSON.stringify(payload.user)}`;
      document.cookie = `token=${JSON.stringify(response.jwtToken)}`;
      sessionStorage.setItem('token', JSON.stringify(response.jwtToken));
    })
    .catch(() => {
      setApiError(true);
    });
};

export default loginUser;
