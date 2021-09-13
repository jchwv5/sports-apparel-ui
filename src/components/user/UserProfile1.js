import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
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
  const [enable, setEnabled] = React.useState(false);
  return (
    <>
      {apiError}
      <form className={style.form}>
        <fieldset className={style.fieldset} disabled={!enable}>
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
          <legend className={style.legend}>
            <button type="button" className={style.historyButton1}>
              View product history
            </button>
            <label className={style.checkEdit} htmlFor="checkbox_1">
              Edit
              <EditIcon
                fontSize="large"
                color="secondary"
              />
              <input
                id="checkbox_1"
                className={style.edit}
                type="checkbox"
                checked={enable}
                onChange={(evt) => {
                  setEnabled(evt.target.checked);
                }}
              />
            </label>
          </legend>
        </fieldset>
        <fieldset className={style.fieldset1} disabled={!enable}>
          <button type="button" className={style.saveButton1}>
            Save changes
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default UserProfile1;
