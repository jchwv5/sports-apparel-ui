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
            Brand
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div className="collapsible-header">
            Category
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div className="collapsible-header">
            Price
          </div>
          <div className="collapsible-header">
            Color
          </div>
          <div className="collapsible-header">
            Material
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFilter;
