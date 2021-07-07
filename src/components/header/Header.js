import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import loginUser from './HeaderService';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState();
  const [googleLoginError, setGoogleLoginError] = useState('');
  const [apiError, setApiError] = useState(false);

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleLoginError('There was a problem logging in with Google. Please try again later.');
  };

  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/checkout">Cart</NavLink>
      {user && <span>{user.firstName}</span>}
      {user && <span>{user.lastName}</span>}
      {googleLoginError && <span>{googleLoginError}</span>}
      {apiError && <span>Api Error</span>}
      {!user && (
        <GoogleLogin
          clientId="912899852587-7996nh9mlpvpa2446q0il4f9hj5o492h.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
};

export default Header;
