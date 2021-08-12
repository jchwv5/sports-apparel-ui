import { toast } from 'react-toastify';

toast.configure();

function notify(mode, message) {
  if (mode === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'info') {
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
  if (mode === 'warning') {
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      pauseOnHover: false,
      closeOnClick: true
    });
  }
}
export default notify;
