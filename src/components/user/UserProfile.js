import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './UserProfile.module.css';

const UserProfile = () => {
  const location = useLocation();
  const { firstName, lastName } = location.state;
  return (
    <div className={style.userProfile}>
      <h1>
        {firstName}
        {lastName}
      </h1>
    </div>
  );
};

export default UserProfile;
