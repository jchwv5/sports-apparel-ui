/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable quotes */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
import React, { Component, useEffect } from 'react';
import { $, jquery } from 'jquery';
import M from 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';
import styles from './Sidebar.css';

const Sidebar = (props) => {
  useEffect(() => {
    const shiftCardsRight = () => {
      document.getElementById("productCards").style.marginLeft = "320px";
    };
    const shiftCardsLeft = () => {
      document.getElementById("productCards").style.marginLeft = "50px";
    };
    const elem = document.querySelector('.sidenav');
    // eslint-disable-next-line no-unused-vars
    const instance = M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250,
      outDuration: 250,
      preventScrolling: false,
      onOpenStart: shiftCardsRight,
      onCloseEnd: shiftCardsLeft
    });
    instance.open();
  }, []);

  const handleClick = (e) => {
    props.onClick(e.target.dataset.id);
  };

  return (
    <div className={styles}>
      <ul id="slide-out" className="sidenav invisible-top">
        <a href="#!" type="button" data-target="slide-out" className="sidenav-close">
          <i className="material-icons">arrow_back_ios</i>
        </a>
        <li />
        <div>
          <li>
            <a data-id="All" onClick={handleClick.bind(this)}>All</a>
          </li>
        </div>
        <div>
          <li>
            <a data-id="Men" onClick={handleClick.bind(this)}>Men</a>
          </li>
        </div>
        <div>
          <li>
            <a data-id="Women" onClick={handleClick.bind(this)}>Women</a>
          </li>
        </div>
        <div>
          <li>
            <a data-id="Kids" onClick={handleClick.bind(this)}>Kids</a>
          </li>
        </div>
      </ul>
      <div />
      <a href="#!" type="button" data-target="slide-out" className="sidenav-trigger">
        <i className="material-icons">arrow_forward_ios</i>
      </a>
    </div>
  );
};

export default Sidebar;
