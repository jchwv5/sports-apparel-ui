// import React from 'react';
// import { Redirect } from 'react-router-dom';
import constants from '../../utils/constants';
import HttpHelper from '../../utils/HttpHelper';
import notify from '../Toast/Toast';

export default async function makeProduct(obj) {
  console.log(obj);
  await HttpHelper(constants.ALL_PRODUCTS_ENDPOINT, 'POST', obj)
    .then((response) => notify('info', response.message))
    .catch((response) => {
      notify('info', response.message);
    });
}
