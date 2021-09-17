import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-materialize';
import { useLocation, NavLink } from 'react-router-dom';
import FormItemDropdown from '../form/FormItemDropdown';
import UserProfileService from './UserProfileService';
// import TextInputDropdown from '../form/TextInputDropdown';
import style from './UserProfile.module.css';
// import usStates from './usStates';
import validate from '../../utils/validate';
import Constants from '../../utils/constants';
import usStates from './usStates';

const UserProfile = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = React.useState([]);
  const [apiError, setApiError] = useState(false);
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [streetAddressError, setStreetAddressError] = React.useState('');
  const [cityError, setCityError] = React.useState('');
  const [stateError, setStateError] = React.useState('');
  const [zipCodeError, setZipCodeError] = React.useState('');
  const [disable, setDisable] = useState(true);
  const onUserChange = (e) => {
    setUserInfo((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
    setDisable(e.target.value === false);
  };

  useEffect(() => {
    UserProfileService.fetchUserInfo(setUserInfo, setApiError, email);
  }, [email]);
  /**
   *
   * @name handleSubmit
   * @description sends request to save valid form data, then displays status toast
   */
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
  function validateForm() {
    let formIsValid = true;
    let result = validate('text', 'First Name', userInfo.firstName);
    setFirstNameError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'Last Name', userInfo.lastName);
    setLastNameError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('alphaNum', 'Street Address', userInfo.streetAddress);
    setStreetAddressError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'City', userInfo.city);
    setCityError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('drop-down', 'State', userInfo.state);
    setStateError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('zip', 'Zip Code', userInfo.zipCode);
    setZipCodeError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    if (formIsValid) {
      handleSubmit();
      setDisable(true);
    }
  }
  return (
    <div className={style.userField}>
      {apiError && <p className={style.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      {!apiError && (
      <div className={style.form}>
        <>
          <form>
            <div className={style.userInfo}>
              <TextInput
                type="text"
                id="firstName"
                label="First Name"
                onChange={onUserChange}
                value={userInfo.firstName}
              />
              {firstNameError && <p className={style.errMsg}>{firstNameError}</p>}
              <TextInput
                type="text"
                id="lastName"
                label="Last Name"
                onChange={onUserChange}
                value={userInfo.lastName}
              />
              {lastNameError && <p className={style.errMsg}>{lastNameError}</p>}
              <TextInput
                placeholder="e.g. 123 Sesame Street"
                type="text"
                id="streetAddress"
                label="Street Address"
                onChange={onUserChange}
                value={userInfo.streetAddress}
              />
              {streetAddressError && <p className={style.errMsg}>{streetAddressError}</p>}
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
              {cityError && <p className={style.errMsg}>{cityError}</p>}
              <FormItemDropdown
                id="state"
                label="State"
                options={usStates}
                onChange={onUserChange}
                placeholder="[Select State]"
                value={userInfo.state}
              />
              {stateError && <p className={style.errMsg}>{stateError}</p>}
              <TextInput
                placeholder="e.g. 12345"
                type="text"
                id="zipCode"
                label="Zip Code"
                onChange={onUserChange}
                value={userInfo.zipCode}
              />
              {zipCodeError && <p className={style.errMsg}>{zipCodeError}</p>}
            </div>
          </form>
        </>
      </div>
      )}
      <div className={style.buttons}>
        <button id="submit" onClick={validateForm} type="button" className={style.saveButton} disabled={disable}>
          Save changes
        </button>
        <NavLink to="/purchases-history-page/PurchasesHistoryPage">
          <button type="button" className={style.historyButton}>
            View product history
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
