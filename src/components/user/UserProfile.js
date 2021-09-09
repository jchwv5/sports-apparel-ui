import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './UserProfile.module.css';
import fetchUserInfo from './UserProfileService';
import Constants from '../../utils/constants';

const UserProfile = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);
  console.log(userInfo);
  return (
    <div>
      {' '}
      {apiError && (
      <p className={style.errMsg} data-testid="errMsg">
        {Constants.API_ERROR}
      </p>
      )}

      <div className={style.userProfile}>
        <div id={style.firstName}>
          First Name:
          {' '}
          {userInfo.firstName}
        </div>
        <div id={style.lastName}>
          Last Name:
          {' '}
          {userInfo.lastName}
        </div>

        {!userInfo.streetAddress
        && (
        <div id={style.streetAddress}>
          Street: There is no street provided for this account
        </div>
        )}
        {userInfo.streetAddress && (
          <div id={style.streetAddress}>
            Street:
            {' '}
            {userInfo.streetAddress}
          </div>
        )}

        {!userInfo.city
        && (
        <div id={style.city}>
          City: There is no state provided for this account
        </div>
        )}
        {userInfo.city && (
          <div id={style.city}>
            City:
            {' '}
            {userInfo.city}
          </div>
        )}

        {!userInfo.state
        && (
        <div id={style.state}>
          State: There is no state provided for this account
        </div>
        )}
        {userInfo.state && (
          <div id={style.state}>
            State:
            {' '}
            {userInfo.state}
          </div>
        )}

        {!userInfo.zipCode
        && (
        <div id={style.zipCode}>
          Zip: There is no state provided for this account
        </div>
        )}
        {userInfo.zipCode && (
          <div id={style.zipCode}>
            Zip:
            {' '}
            {userInfo.zipCode}
          </div>
        )}

        {!userInfo.phoneNumber
        && (
        <div id={style.phoneNumber}>
          Phone number: There is no state provided for this account
        </div>
        )}
        {userInfo.phoneNumber && (
          <div id={style.phoneNumber}>
            Phone number:
            {' '}
            {userInfo.phoneNumber}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
