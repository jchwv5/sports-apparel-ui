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
  } else if (mode === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  } else if (mode === 'info') {
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      hideProgressBar: true,
      pauseOnHover: false,
      closeOnClick: true
    });
  } else if (mode === 'warning') {
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
