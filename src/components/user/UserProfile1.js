import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-materialize';
import { useLocation } from 'react-router-dom';
import UserProfileService from './UserProfileService';
// import TextInputDropdown from '../form/TextInputDropdown';
import style from './UserProfile.module.css';
// import usStates from './usStates';
import validate from '../../utils/validate';
import Constants from '../../utils/constants';

const UserProfile1 = () => {
  const location = useLocation();
  const { email } = location.state;
  const [userInfo, setUserInfo] = React.useState([]);
  const [apiError, setApiError] = useState(false);
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [demographicError, setDemographicError] = React.useState('');
  const [categoryError, setCategoryError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  const [materialError, setMaterialError] = React.useState('');
  const onUserChange = (e) => {
    setUserInfo((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
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
    setNameError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'Last Name', userInfo.lastName);
    setDescriptionError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('alphaNum', 'Street', userInfo.streetAddress);
    setDemographicError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'City', userInfo.city);
    setCategoryError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('text', 'State', userInfo.state);
    setTypeError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    result = validate('zip', 'Zip', userInfo.zipCode);
    setMaterialError(result.errorMessage);
    if (!result.dataIsValid) {
      formIsValid = false;
    }
    if (formIsValid) {
      handleSubmit();
    }
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
              {nameError && <p className={style.errMsg}>{nameError}</p>}
              <TextInput
                type="text"
                id="lastName"
                label="Last Name"
                onChange={onUserChange}
                value={userInfo.lastName}
              />
              {nameError && <p className={style.errMsg}>{nameError}</p>}
              <TextInput
                placeholder="e.g. 123 Sesame Street"
                type="text"
                id="streetAddress"
                label="Street"
                onChange={onUserChange}
                value={userInfo.streetAddress}
              />
              {descriptionError && <p className={style.errMsg}>{descriptionError}</p>}
              <TextInput
                placeholder="e.g. Unit #1"
                type="text"
                id="streetAddress2"
                label="Street 2 (Optional)"
                onChange={onUserChange}
                value={userInfo.streetAddress2}
              />
              {demographicError && <p className={style.errMsg}>{demographicError}</p>}
              <TextInput
                placeholder="e.g. Denver"
                type="text"
                id="city"
                label="City"
                onChange={onUserChange}
                value={userInfo.city}
              />
              {categoryError && <p className={style.errMsg}>{categoryError}</p>}
              <TextInput
                id="state"
                label="State"
                color="secondary"
                onChange={onUserChange}
                placeholder="[Select State]"
                value={userInfo.state}
              />
              {typeError && <p className={style.errMsg}>{typeError}</p>}
              <TextInput
                placeholder="e.g. 12345"
                type="text"
                id="zipCode"
                label="Zip"
                onChange={onUserChange}
                value={userInfo.zipCode}
              />
              {materialError && <p className={style.errMsg}>{materialError}</p>}
            </div>
            <button onClick={validateForm} type="button" className={style.saveButton1}>
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
