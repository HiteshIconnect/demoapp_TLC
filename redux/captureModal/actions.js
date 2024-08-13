import { captureModalType } from "./types";
import api from "../../services/api";


export const toggleCaptureModal = (value) => {
  return {
    type: captureModalType.TOGGLE_CAPTURE_MODAL,
    payload: value,
  };
};

// export const setCaptureModal=(handler)=>{
//   return {
//     type:captureModalType.SET_CAPTURE_MODAL,
//     payload:{
//       handler
//     }
//   }
// }

export const unsetCaptureModal=()=>{
  return {
    type:captureModalType.UNSET_CAPTURE_MODAL,
  }
}

