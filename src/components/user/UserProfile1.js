import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-materialize';
import { useLocation } from 'react-router-dom';
import UserProfileService from './UserProfileService';
import FormItemDropdown from '../form/FormItemDropdown';
import style from './UserProfile.module.css';
import usStates from './usStates';
import FormItem from '../form/FormItem';
import Constants from '../../utils/constants';

const UserProfile1 = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = useState([]);
  const [apiError, setApiError] = useState(false);
  const handleChange = (e) => {
    setUserInfo({ value: e.target.value });
  };
  useEffect(() => {
    UserProfileService.fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);

  function handleSubmit() {
    UserProfileService.userUpdate(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.streetAddress,
      userInfo.streetAddress2,
      userInfo.city,
      userInfo.state,
      userInfo.zipCode,
      userInfo.phoneNumber,
      setApiError
    );
  }
  return (
    <div>
      {apiError && <p className={style.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      {!apiError && (
      <div className={style.container}>
        <>
          <form className={style.form}>
            <div className={style.userInfo}>
              <TextInput
                type="text"
                id="firstName"
                label="First Name"
                onChange={handleChange}
                value={userInfo.firstName}
              />
              <FormItem
                type="text"
                id="lastName"
                label="Last Name"
                onChange={handleChange}
                value={userInfo.lastName}
              />
              <FormItem
                placeholder="e.g. 123 Sesame Street"
                type="text"
                id="userStreet"
                label="Street"
                onChange={handleChange}
                value={userInfo.street}
              />
              <FormItem
                placeholder="e.g. Unit #1"
                type="text"
                id="deliveryStreet2"
                label="Street 2 (Optional)"
                onChange={handleChange}
                value={userInfo.street2}
              />
              <FormItem
                placeholder="e.g. Denver"
                type="text"
                id="userCity"
                label="City"
                onChange={handleChange}
                value={userInfo.city}
              />
              <FormItemDropdown
                id="userState"
                label="State"
                color="secondary"
                onChange={handleChange}
                placeholder="[Select State]"
                value={userInfo.state}
                options={usStates}
              />
              <FormItem
                placeholder="e.g. 12345"
                type="text"
                id="deliveryZip"
                label="Zip"
                onChange={handleChange}
                value={userInfo.zip}
              />
            </div>
            <button onClick={handleSubmit} type="button" className={style.saveButton1}>
              Save changes
            </button>
            <button type="button" className={style.historyButton1}>
              View product history
            </button>
          </form>
        </>
      </div>
      )}
    </div>
  );
};

export default UserProfile1;
