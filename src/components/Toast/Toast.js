import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

/**
 * given a type and message to display
 * makes a toast with the type and message
 * @param {String} mode - the toast type
 * @param {String} message - message to display
 */
function notify(mode, message) {
  if (mode === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'error') {
    toast.error(<div>{message}</div>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'info') {
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'warning') {
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
}
export default notify;
