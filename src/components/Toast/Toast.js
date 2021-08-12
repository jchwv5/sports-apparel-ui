import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ mode, message }) => {
  if ( mode === 'notify'){
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
      pauseOnHover: false,
      closeOnClick: true
    });

  }
  if (mode === 'success'){
    toast.success(message,{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
        pauseOnHover: false,
        closeOnClick: true
      } );
    }
    if (mode === 'error'){
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
        pauseOnHover: false,
        closeOnClick: true
      });
    }
    if (mode === 'warn'){
      toast.warn(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
        pauseOnHover: false,
        closeOnClick: true
      });
   }

  }

  export default Toast;