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

        <table className={style.userTable}>

          <div id={style.firstName}>
            <tr className={style.tableRows}>
              <td className={style.columnOne}>
                First Name:
              </td>
              <td className={style.columnTwo}>
                <input
                  type="text"
                  value={userInfo.firstName}
                  id={style.firstName}
                />
              </td>
            </tr>
          </div>

          <div id={style.lastName}>
            <tr className={style.tableRows} id={style.lastName}>
              <td className={style.columnOne}> Last name: </td>
              <td className={style.columnTwo}>
                <input
                  type="text"
                  value={userInfo.lastName}
                  id={style.lastName}
                />
              </td>
            </tr>
          </div>

          {!userInfo.streetAddress
        && (
        <div id={style.streetAddress}>
          <tr className={style.tableRows}>
            <td className={style.columnOne}> Street:</td>
            <td className={style.columnTwo}>
              <input
                type="text"
                value="There is no street provided for this account."
                id={style.street}
              />
            </td>
          </tr>
        </div>
        )}

          {userInfo.streetAddress && (
            <div id={style.streetAddress}>
              <tr className={style.tableRows} id={style.street}>
                <td className={style.columnOne}>Street: </td>
                <td className={style.columnTwo}>
                  <input
                    type="text"
                    value={userInfo.streetAddress}
                    id={style.street}
                  />
                </td>
              </tr>
            </div>
          )}

          {!userInfo.city
        && (
        <div id={style.city}>
          <tr className={style.tableRows} id={style.city}>
            <td className={style.columnOne}>City:</td>
            <td className={style.columnTwo}>
              <input
                type="text"
                value="There is no city provided for this account."
                id={style.city}
              />
            </td>
          </tr>
        </div>
        )}

          {userInfo.city && (
            <div id={style.city}>
              <tr className={style.tableRows} id={style.city}>
                <td className={style.columnOne}>City:</td>
                <td className={style.columnTwo}>
                  <input
                    type="text"
                    value={userInfo.city}
                  />
                </td>
              </tr>
            </div>
          )}

          {!userInfo.state
        && (
        <div id={style.state}>
          <tr className={style.tableRows} id={style.state}>
            <td className={style.columnOne}>State:</td>
            <td className={style.columnTwo}>
              <input
                type="text"
                value="There is no state provided for this account."
                id={style.state}
              />
            </td>
          </tr>
        </div>
        )}

          {userInfo.state && (
            <div id={style.state}>
              <tr className={style.tableRows} id={style.state}>
                <td className={style.columnOne}>State:</td>
                <td className={style.columnTwo}>
                  <input
                    type="text"
                    value={userInfo.state}
                  />
                </td>
              </tr>
            </div>
          )}

          {!userInfo.zipCode
        && (
        <div id={style.zipCode}>
          <tr className={style.tableRows} id={style.zip}>
            <td className={style.columnOne}>Zip:</td>
            <td className={style.columnTwo}>
              <input
                type="text"
                value="There is no zip provided for this account."
              />
            </td>
          </tr>
        </div>
        )}

          {userInfo.zipCode && (
            <div id={style.zipCode}>
              <tr className={style.tableRows} id={style.zip}>
                <td className={style.columnOne}>Zip:</td>
                <td className={style.columnTwo}>
                  <input
                    type="text"
                    value={userInfo.zipCode}
                  />
                </td>
              </tr>
            </div>
          )}

          {!userInfo.phoneNumber
        && (
        <div id={style.phoneNumber}>
          <tr className={style.tableRows} id={style.phone}>
            <td className={style.columnOne}>Phone number:</td>
            <td className={style.columnTwo}>
              <input
                type="text"
                value="There is no phone number provided for this account."
              />
            </td>
          </tr>
        </div>
        )}

          {userInfo.phoneNumber && (
            <div id={style.phoneNumber}>
              <tr className={style.tableRows} id={style.phone}>
                <td className={style.columnOne}>Phone number:</td>
                <td className={style.columnTwo}>
                  <input
                    type="text"
                    value={userInfo.phoneNumber}
                  />
                </td>
              </tr>
            </div>
          )}

        </table>
      </div>

      <button type="button" className={style.saveButton}>
        Save changes
      </button>
      <button type="button" className={style.historyButton}>
        View product history
      </button>
    </div>
  );
};

export default UserProfile;
