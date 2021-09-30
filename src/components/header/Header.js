/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import logo from '../../assets/logo.png';
// import cartLogo from '../../assets/cartLogo.png';
import style from './Header.module.css';
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
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
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
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  return (
    <div className={style.header}>
      <ul className={style.ul}>
        <li className={style.li}>
          <NavLink to="/">
            <img className={style.logo} src={logo} alt="" />
          </NavLink>
        </li>
        <li id={style.cart}>
          <NavLink to={{
            pathname: '/checkout',
            state: {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            }
          }}
          >
            <Badge
              className={style.root}
              badgeContent={products.length}
              color="primary"
              overlap="circular"
            >
              <ShoppingCartIcon style={{ fontSize: 60, color: 'black' }} />
            </Badge>
          </NavLink>
        </li>
        <li>
          {user && (
          <NavLink to={{
            pathname: '/user',
            state: { email: user.email }
          }}
          >
            <PersonIcon
              className={style.profileIcon}
              style={{ fontSize: 72, color: 'black' }}
            />
          </NavLink>
          )}
        </li>
        {user && <span className={style.user}>{user.email}</span>}
        {googleError && <span>{googleError}</span>}
        {apiError && <span>Api Error</span>}
        <li className={style.googleLogin}>
          {!user ? (
            <GoogleLogin
              clientId={constants.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin"
              id={style.login}
            />
          ) : (
            <NavLink to="/">
              <GoogleLogout
                clientId={constants.GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={handleGoogleLogoutSuccess}
                onSuccess={handleGoogleLogoutFailure}
                id={style.logout}
              />
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
