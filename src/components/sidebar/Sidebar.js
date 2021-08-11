/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Sidebar = () => (
  <>
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
      <li><a href="#!" className="subheader">Subheader</a></li>
      <li><a href="#!" className="waves-effect">Third Link With Waves</a></li>
    </ul>
    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
  </>
);

export default Sidebar;
