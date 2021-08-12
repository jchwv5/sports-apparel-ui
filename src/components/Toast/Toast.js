import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Toast() {
    const notify = () => {
      toast("Default Notification !");
      
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:8000,
        pauseOnHover:false,
        closeOnClick:true,
      });

      toast.warn("Warning Notification !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:8000,
        pauseOnHover:false,
        closeOnClick:true,
      });

      toast.info("Info Notification !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:8000,
        pauseOnHover:false,
        closeOnClick:true,
      });
    };
    const success = () => {
        toast.success("Success Notification !",{
            position: toast.POSITION.TOP_CENTER,
            autoClose:8000,
            pauseOnHover:false,
            closeOnClick:true,
         } );
    }

    return (<div><button onClick={notify}>Notify</button><ToastContainer/> </div>);
  }