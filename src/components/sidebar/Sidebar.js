import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return () => (
      <>
        <nav>
          <div className="nav-wrapper">
            <a href="google.com" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
          </div>
        </nav>
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img alt="" src="images/office.jpg" />
              </div>
              <a href="#user"><img className="circle" alt="" src="images/yuna.jpg" /></a>
              <a href="#name"><span className="white-text name">John Doe</span></a>
              <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
            </div>
          </li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider" /></li>
          <li><a href="#subheader" className="subheader">Subheader</a></li>
          <li><a href="waves" className="waves-effect">Third Link With Waves</a></li>
        </ul>
        <a href="google.com" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </>
    );
  }
}
export default Sidebar;
