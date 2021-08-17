/* eslint-disable react/no-this-in-sfc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
import React, { Component, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';
import { Sidenav } from 'rsuite';
import styles from './Sidebar.css';

const Sidebar = (props) => {
  useEffect(() => {
    const elem = document.querySelector('.sidenav');
    // eslint-disable-next-line no-unused-vars
    const instance = M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250,
      preventScrolling: false,
      closeOnClick: true
    });
  }, []);

  const handleClick = (e) => {
    props.onClick(e.target.dataset.id);
  };

  return (
    <div>
      <ul id="slide-out" className="sidenav invisible-top sidenav-fixed">
        <a href="#!" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <li />
        <div>
          <li>
            <a href="#!!" data-id="All" onClick={handleClick.bind(this)}>All</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!!" data-id="Men" onClick={handleClick.bind(this)}>Men</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!!!" data-id="Women" onClick={handleClick.bind(this)}>Women</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!!!!" data-id="Kids" onClick={handleClick.bind(this)}>Kids</a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
