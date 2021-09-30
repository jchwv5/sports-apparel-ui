import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

async function updateTimeStamp(user) {
  await HttpHelper(constants.USER_UPDATED_TIMESTAMP, 'PUT', user).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  });
}
export default updateTimeStamp;
