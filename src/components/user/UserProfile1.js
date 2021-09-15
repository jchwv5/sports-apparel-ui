import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-materialize';
import { useLocation } from 'react-router-dom';
import UserProfileService from './UserProfileService';
// import TextInputDropdown from '../form/TextInputDropdown';
import style from './UserProfile.module.css';
// import usStates from './usStates';
import Constants from '../../utils/constants';

const UserProfile1 = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = React.useState([]);
  const [apiError, setApiError] = useState(false);

  const onUserChange = (e) => {
    setUserInfo((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    UserProfileService.fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);

  function handleSubmit() {
    UserProfileService.userUpdate(
      userInfo.id,
      userInfo.email,
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
                onChange={onUserChange}
                value={userInfo.firstName}
              />
              <TextInput
                type="text"
                id="lastName"
                label="Last Name"
                onChange={onUserChange}
                value={userInfo.lastName}
              />
              <TextInput
                placeholder="e.g. 123 Sesame Street"
                type="text"
                id="streetAddress"
                label="Street"
                onChange={onUserChange}
                value={userInfo.streetAddress}
              />
              <TextInput
                placeholder="e.g. Unit #1"
                type="text"
                id="streetAddress2"
                label="Street 2 (Optional)"
                onChange={onUserChange}
                value={userInfo.streetAddress2}
              />
              <TextInput
                placeholder="e.g. Denver"
                type="text"
                id="city"
                label="City"
                onChange={onUserChange}
                value={userInfo.city}
              />
              <TextInput
                id="state"
                label="state"
                color="secondary"
                onChange={onUserChange}
                placeholder="[Select State]"
                value={userInfo.state}
              />
              <TextInput
                placeholder="e.g. 12345"
                type="text"
                id="zipCode"
                label="Zip"
                onChange={onUserChange}
                value={userInfo.zipCode}
              />
              <TextInput
                placeholder="XXX-XXX-XXXX"
                type="text"
                id="phoneNumber"
                label="Phone"
                onChange={onUserChange}
                value={userInfo.phoneNumber}
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
