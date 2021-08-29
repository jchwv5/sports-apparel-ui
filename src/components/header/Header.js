/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import logo from '../../assets/logo.png';
// import cartLogo from '../../assets/cartLogo.png';
import './Header.css';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const {
    state: { products }
  } = useCart();

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError('There was a problem logging in with Google. Please wait and try again later.');
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };

  return (
    <div className="header">
      <ul className="ul">
        <li className="li">
          <NavLink to="/">
            <img className="logo" src={logo} alt="" />
          </NavLink>
        </li>
        <li id="cart" className="li">
          <NavLink to="/checkout">
            <Badge
              className="root"
              badgeContent={products.length}
              color="primary"
              overlap="circular">
              {/* <img className="cart" src={cartLogo} alt="" /> */}
              <ShoppingCartIcon style={{ fontSize: 60, color: 'black' }} />
            </Badge>
          </NavLink>
        </li>
        {user && <span>{user.firstName}</span>}
        {user && <span>{user.lastName}</span>}
        {googleError && <span>{googleError}</span>}
        {apiError && <span>Api Error</span>}
        <li className="li">
          {!user ? (
            <GoogleLogin
              clientId={constants.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin"
            />
          ) : (
            <GoogleLogout
              clientId={constants.GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleGoogleLogoutSuccess}
              onSuccess={handleGoogleLogoutFailure}
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
