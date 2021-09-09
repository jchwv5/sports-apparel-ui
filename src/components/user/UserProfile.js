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
  return (
    <div className={style.userContainer}>
      {' '}
      {apiError && (
      <p className={style.errMsg} data-testid="errMsg">
        {Constants.API_ERROR}
      </p>
      )}

      <div className={style.userProfile}>

        <div id={style.firstName}>
          <div className={style.columnOne} id={style.firstNameRow}>
            First Name:
          </div>
          <div className={style.columnTwo} id={style.firstNameColumn}>
            <input
              type="text"
              value={userInfo.firstName}
              id={style.firstNameColumn}
            />
          </div>
        </div>

        <div id={style.lastName}>
          <div id={style.lastNameRow}> Last name: </div>
          <div className={style.columnTwo}>
            <input
              type="text"
              value={userInfo.lastName}
              id={style.lastNameColumn}
            />
          </div>
        </div>

        {!userInfo.streetAddress
        && (
        <div id={style.streetAddress}>
          <div className={style.columnOne} id={style.streetRow}> Street:</div>
          <div className={style.columnTwo} id={style.streetColumn}>
            <input
              type="text"
              value="No street provided"
              id={style.streetColumn}
            />
          </div>
        </div>
        )}

        {userInfo.streetAddress && (
        <div id={style.streetAddress}>
          <div className={style.columnOne} id={style.streetRow}> Street:</div>
          <div className={style.columnTwo} id={style.streetColumn}>
            <input
              type="text"
              value={userInfo.streetAddress}
              id={style.streetColumn}
            />
          </div>
        </div>
        )}

        {!userInfo.city
        && (
        <div id={style.city}>
          <div className={style.columnOne} id={style.cityRow}>City: </div>
          <div className={style.columnTwo} id={style.cityColumn}>
            <input
              type="text"
              value="No city provided"
              id={style.cityColumn}
            />
          </div>
        </div>
        )}

        {userInfo.city && (
        <div id={style.city}>
          <div className={style.columnOne} id={style.cityRow}>City: </div>
          <div className={style.columnTwo} id={style.cityColumn}>
            <input
              type="text"
              value={userInfo.city}
              id={style.cityColumn}
            />
          </div>
        </div>
        )}

        {!userInfo.state
        && (
        <div id={style.state}>
          <div className={style.columnOne} id={style.stateRow}>State:</div>
          <div className={style.columnTwo} id={style.stateColumn}>
            <input
              type="text"
              value="No state provided"
              id={style.stateColumn}
            />
          </div>
        </div>
        )}

        {userInfo.state && (
        <div id={style.state}>
          <div className={style.columnOne} id={style.stateRow}>State:</div>
          <div className={style.columnTwo} id={style.stateColumn}>
            <input
              type="text"
              value={userInfo.state}
              id={style.stateColumn}
            />
          </div>
        </div>
        )}

        {!userInfo.zipCode
        && (
        <div id={style.zipCode}>
          <div className={style.columnOne} id={style.zipRow}>Zip:</div>
          <div className={style.columnTwo} id={style.zipColumn}>
            <input
              type="text"
              value="No zip provided"
              id={style.zipColumn}
            />
          </div>
        </div>
        )}

        {userInfo.zipCode && (
        <div id={style.zipCode}>
          <div className={style.columnOne} id={style.zipRow}>Zip:</div>
          <div className={style.columnTwo} id={style.zipColumn}>
            <input
              type="text"
              value={userInfo.zip}
              id={style.zipColumn}
            />
          </div>
        </div>
        )}

        {!userInfo.phoneNumber
        && (
        <div id={style.phoneNumber}>
          <div className={style.columnOne} id={style.phoneRow}>Phone number:</div>
          <div className={style.columnTwo} id={style.phoneColumn}>
            <input
              type="text"
              value="No phone provided"
              id={style.phoneColumn}
            />
          </div>
        </div>
        )}

        {userInfo.phoneNumber && (
        <div id={style.phoneNumber}>
          <div className={style.columnOne} id={style.phoneRow}>Phone number:</div>
          <div className={style.columnTwo} id={style.phoneColumn}>
            <input
              type="text"
              value={userInfo.phoneNumber}
              id={style.phoneColumn}
            />
          </div>
        </div>
        )}

        <button type="button" className={style.saveButton}>
          Save changes
        </button>
        <button type="button" className={style.historyButton}>
          View product history
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
