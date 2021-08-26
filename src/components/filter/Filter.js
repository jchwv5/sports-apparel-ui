/* eslint-disable no-unused-vars */
import React from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import styles from './Filter.css';

const SidebarFilter = () => {
  const elems = document.querySelectorAll('.collapsible');
  const instances = M.Collapsible.init(elems, {});
  return (
    <div className={styles}>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">filter_drama</i>
            First
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">place</i>
            Second
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">whatshot</i>
            Third
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFilter;
