import {toast} from 'react-toastify'

export const toaster = (resps, successMessage) => {
    if(resps === true ){
        toast.success(successMessage, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      else{
        toast.error(resps.errors.map((err)=>err.msg).join(", "), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
}