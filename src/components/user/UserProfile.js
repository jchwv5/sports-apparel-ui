import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchUserInfo from './UserProfileService';
import FormItemDropdown from '../form/FormItemDropdown';
import style from './UserProfile.module.css';
import usStates from './usStates';
import FormItem from '../form/FormItem';

/**
 * Handles the rendering of the user profile as well as updating the user info from the database
 * and displays that information to the user so they know what information is already saved
 * for them.
 */

const UserProfile = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = useState([]);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);

  const onUserChange = (e) => {
    setUserInfo((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
  };

  return (
    <>
      {apiError}
      <div id={style.userField}>
        <form className={style.form}>
          <fieldset className={style.fieldset}>
            <div className={style.userInfo}>
              <FormItem
                placeholder="e.g: Andrew"
                type="text"
                id="firstName"
                label="First Name"
                onChange={onUserChange}
                value={userInfo.firstName}
              />
              <FormItem
                placeholder="e.g: LaNoue"
                type="text"
                id="lastName"
                label="Last Name"
                onChange={onUserChange}
                value={userInfo.lastName}
              />
              <FormItem
                placeholder="e.g: 5050 Columbus St SE #73"
                type="text"
                id="userStreet"
                label="Street"
                onChange={onUserChange}
                value={userInfo.street}
              />
              <FormItem
                placeholder="e.g: 5050 Columbus St SE #72"
                type="text"
                id="deliveryStreet2"
                label="Street 2 (Optional)"
                onChange={onUserChange}
                value={userInfo.street2}
              />
              <FormItem
                placeholder="e.g: Albany"
                type="text"
                id="userCity"
                label="City"
                onChange={onUserChange}
                value={userInfo.city}
              />
              <FormItemDropdown
                id="userState"
                label="State"
                color="secondary"
                onChange={onUserChange}
                placeholder="[Select State]"
                options={usStates}
                value={userInfo.state}
              />
              <FormItem
                placeholder="e.g: 97322"
                type="text"
                id="deliveryZip"
                label="Zip"
                onChange={onUserChange}
                value={userInfo.zip}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div id={style.buttons}>
        <button type="button" id={style.saveButton}>
          Save changes
        </button>
        <button type="button" id={style.historyButton}>
          View product history
        </button>
      </div>
    </>
  );
};

export default UserProfile;
