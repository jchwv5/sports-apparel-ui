import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';

class Sidebar extends Component {
  componentDidMount() {
    const elem = document.querySelector('.sidenav');
    // eslint-disable-next-line no-unused-vars
    const instance = M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250,
      preventScrolling: false
    });
  }

  render() {
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <li />
          <li>
            <a href="#!" value="Men">Men</a>
          </li>
          <li>
            <a href="#!" value="Women">Women</a>
          </li>
          <li>
            <a href="#!" value="Kids">Kids</a>
          </li>
        </ul>
        <a href="#!" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidebar;
