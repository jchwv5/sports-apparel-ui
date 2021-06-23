import React from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/checkout">Cart</NavLink>
    <GoogleLogin>
      Login
    </GoogleLogin>
  </div>
);

export default Header;
