/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import styles from './Sidebar.css';
import SidebarFilter from '../filter/Filter';

/**
 * Function to initialize sidebar component
 * @param {*} props sidebar returns filterParam to ProductPage.js
 */
const Sidebar = (props) => {
  useEffect(() => {
    const shiftCardsRight = () => {
      document.getElementById('productCards').style.marginLeft = '400px';
    };
    const shiftCardsLeft = () => {
      document.getElementById('productCards').style.marginLeft = '50px';
    };
    const elem = document.querySelector('.sidenav');
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

  /**
   *Function to pass data-id value of clicked link to product page as filterParam
   * @param {*} e click event target
   */
  const handleClick = (e) => {
    props.onClick(e.target.dataset.id);
  };

  return (
    <div className={styles}>
      <ul id="slide-out" className="sidenav invisible-top">
        <a href="#!" type="button" data-target="slide-out" className="sidenav-close">
          <i className="material-icons">arrow_back_ios</i>
        </a>
        <div>
          <li>
            <a href="#!" data-id="All" onClick={handleClick.bind(this)}>All</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!" data-id="Men" onClick={handleClick.bind(this)}>Men</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!" data-id="Women" onClick={handleClick.bind(this)}>Women</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#!" data-id="Kids" onClick={handleClick.bind(this)}>Kids</a>
          </li>
        </div>
        <div>
          <li>
            <SidebarFilter />
          </li>
        </div>
      </ul>
      <div />
      <a
        href="#!"
        type="button"
        data-target="slide-out"
        className="sidenav-trigger"
      >
        <i className="material-icons">arrow_forward_ios</i>
      </a>
    </div>
  );
};

export default Sidebar;
