/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Brightness1 } from '@material-ui/icons';
import { GetColorName } from 'hex-color-to-color-name';
import M from 'materialize-css/dist/js/materialize.min';
import ReactColorSquare from 'react-color-square';
import styles from './Filter.css';
import fetchProducts from '../product-page/ProductPageService';

const SidebarFilter = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const elems = document.querySelectorAll('.collapsible');
  const instance = M.Collapsible.init(elems, {});
  const brands = [...new Set(products.map((data) => data.brand))];
  const categories = [...new Set(products.map((data) => data.category))];
  const colors = [...new Set(products.map((data) => data.primaryColorCode
    && data.secondaryColorCode))];
  const materials = [...new Set(products.map((data) => data.material))];

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  return (
    <div className={styles}>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            Brand
          </div>
          <div className="collapsible-body">
            {brands.map((brand) => (
              <li data-id={brand} className="filterContents">
                <input type="checkbox" />
                {brand}
              </li>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            Category
          </div>
          <div className="collapsible-body">
            {categories.map((category) => (
              <li data-id={category} className="filterContents">
                <input type="checkbox" />
                {category}
              </li>
            ))}
          </div>
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
          <div className="collapsible-body">
            {colors.map((color) => (
              <li data-id={color} className="filterColor">
                <input type="checkbox" />
                <ReactColorSquare className="square" height={20} width={20} color={color} />
              </li>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            Material
          </div>
          <div className="collapsible-body">
            {materials.map((material) => (
              <li data-id={material} className="filterContents">
                <input type="checkbox" />
                {material}
              </li>
            ))}
          </div>
        </li>
        <button type="button">Submit</button>
        <button type="button">Clear</button>
      </ul>
    </div>
  );
};

export default SidebarFilter;
