import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchUserInfo from './UserProfileService';
import FormItemDropdown from '../form/FormItemDropdown';
import style from './UserProfile.module.css';
import usStates from './usStates';
import FormItem from '../form/FormItem';

const UserProfile1 = ({ onChange }) => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = useState([]);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);
  return (
    <>
      {apiError}
      <form className={style.form}>
        <div className={style.userInfo}>
          <FormItem
            type="text"
            id="firstName"
            label="First Name"
            onChange={onChange}
            value={userInfo.firstName}
          />
          <FormItem
            type="text"
            id="lastName"
            label="Last Name"
            onChange={onChange}
            value={userInfo.lastName}
          />
          <FormItem
            placeholder="e.g. 123 Sesame Street"
            type="text"
            id="userStreet"
            label="Street"
            onChange={onChange}
            value={userInfo.street}
          />
          <FormItem
            placeholder="e.g. Unit #1"
            type="text"
            id="deliveryStreet2"
            label="Street 2 (Optional)"
            onChange={onChange}
            value={userInfo.street2}
          />
          <FormItem
            placeholder="e.g. Denver"
            type="text"
            id="userCity"
            label="City"
            onChange={onChange}
            value={userInfo.city}
          />
          <FormItemDropdown
            id="userState"
            label="State"
            color="secondary"
            onChange={onChange}
            placeholder="[Select State]"
            value={userInfo.state}
            options={usStates}
          />
          <FormItem
            placeholder="e.g. 12345"
            type="text"
            id="deliveryZip"
            label="Zip"
            onChange={onChange}
            value={userInfo.zip}
          />
        </div>
        <button type="button" className={style.saveButton1}>
          Save changes
        </button>
        <button type="button" className={style.historyButton1}>
          View product history
        </button>
      </form>
    </>
  );
};

export default UserProfile1;
