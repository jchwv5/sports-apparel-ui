/* eslint-disable jsx-a11y/label-has-associated-control */
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
          <div className="collapsible-body">
            <li>
              <input type="checkbox" />
              Adidas
            </li>
            <li>
              <input type="checkbox" />
              Champion
            </li>
            <li>
              <input type="checkbox" />
              Columbia Sportswear
            </li>
            <li>
              <input type="checkbox" />
              Jordan
            </li>
            <li>
              <input type="checkbox" />
              New Balance
            </li>
            <li>
              <input type="checkbox" />
              Nike
            </li>
            <li>
              <input type="checkbox" />
              Patagonia
            </li>
            <li>
              <input type="checkbox" />
              Puma
            </li>
            <li>
              <input type="checkbox" />
              Reebok
            </li>
            <li>
              <input type="checkbox" />
              Under Armour
            </li>
          </div>
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
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div className="collapsible-header">
            Color
          </div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
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
