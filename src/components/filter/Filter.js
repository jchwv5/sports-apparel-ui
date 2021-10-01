/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import styles from './Filter.css';
import fetchAllProducts from './FilterService';

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

  function toggleBrandsArrow() {
    const toggleElement = document.getElementById('brandsArrow');
    if (toggleElement.innerHTML === 'keyboard_arrow_right') {
      toggleElement.innerHTML = 'keyboard_arrow_down';
    } else {
      toggleElement.innerHTML = 'keyboard_arrow_right';
    }
  }

  function toggleCategoryArrow() {
    const toggleElement = document.getElementById('categoryArrow');
    if (toggleElement.innerHTML === 'keyboard_arrow_right') {
      toggleElement.innerHTML = 'keyboard_arrow_down';
    } else {
      toggleElement.innerHTML = 'keyboard_arrow_right';
    }
  }

  function togglePriceArrow() {
    const toggleElement = document.getElementById('priceArrow');
    if (toggleElement.innerHTML === 'keyboard_arrow_right') {
      toggleElement.innerHTML = 'keyboard_arrow_down';
    } else {
      toggleElement.innerHTML = 'keyboard_arrow_right';
    }
  }

  function toggleColorArrow() {
    const toggleElement = document.getElementById('colorArrow');
    if (toggleElement.innerHTML === 'keyboard_arrow_right') {
      toggleElement.innerHTML = 'keyboard_arrow_down';
    } else {
      toggleElement.innerHTML = 'keyboard_arrow_right';
    }
  }

  function toggleMaterialArrow() {
    const toggleElement = document.getElementById('materialArrow');
    if (toggleElement.innerHTML === 'keyboard_arrow_right') {
      toggleElement.innerHTML = 'keyboard_arrow_down';
    } else {
      toggleElement.innerHTML = 'keyboard_arrow_right';
    }
  }

  function uncheckAll() {
    document.querySelectorAll('input[type="checkbox"]')
      .forEach((el) => el.checked = false);
  }

  function clearPrice() {
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
  }

  function clearAll() {
    clearPrice();
    uncheckAll();
  }

  useEffect(() => {
    fetchAllProducts(setProducts, setApiError);
  }, []);
  return (
    <div className={styles}>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header" onClick={toggleBrandsArrow}>
            Brand
            <i id="brandsArrow" className="material-icons">keyboard_arrow_right</i>
          </div>
          <div className="collapsible-body">
            {brands.sort().map((brand) => (
              <li data-id={brand} className="filterContents">
                <input type="checkbox" className="checkbox" />
                {brand}
              </li>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={toggleCategoryArrow}>
            Category
            <i id="categoryArrow" className="material-icons">keyboard_arrow_right</i>
          </div>
          <div className="collapsible-body">
            {categories.sort().map((category) => (
              <li data-id={category} className="filterContents">
                <input type="checkbox" className="checkbox" />
                {category}
              </li>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={togglePriceArrow}>
            Price
            <i id="priceArrow" className="material-icons">keyboard_arrow_right</i>
          </div>
          <div className="collapsible-body">
            <div className="filterContents">
              <label htmlFor="priceMin">Min.</label>
              <input id="priceMin" type="number" />
              <label htmlFor="priceMax">Max</label>
              <input id="priceMax" type="number" />
            </div>
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={toggleColorArrow}>
            Color
            <i id="colorArrow" className="material-icons">keyboard_arrow_right</i>
          </div>
          <div className="collapsible-body">
            {colors.map((color) => (
              <li data-id={color} className="filterColor">
                <input type="checkbox" className="checkbox" />
                <div className="square" />
              </li>
            ))}
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={toggleMaterialArrow}>
            Material
            <i id="materialArrow" className="material-icons">keyboard_arrow_right</i>
          </div>
          <div className="collapsible-body">
            {materials.sort().map((material) => (
              <li data-id={material} className="filterContents">
                <input type="checkbox" className="checkbox" />
                {material}
              </li>
            ))}
          </div>
        </li>
        <button type="button">Submit</button>
        <button type="button" onClick={clearAll}>Clear</button>
      </ul>
    </div>
  );
};

export default SidebarFilter;
