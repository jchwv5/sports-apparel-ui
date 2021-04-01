import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/checkout">Cart</NavLink>
  </div>
);

export default Header;
