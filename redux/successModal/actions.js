import { successModalTypes } from "./types";
import api from "../../services/api";


export const setSuccessModal = (value) => {
  return {
    type: successModalTypes.TOGGLE_SUCCESS_MODAL,
    payload: value,
  };
};

export const setSuccess=(title,desc,handler)=>{
  return {
    type:successModalTypes.SET_SUCCESS,
    payload:{
      title,
      desc,
      handler
    }
  }
}

export const unsetSuccess=()=>{
  return {
    type:successModalTypes.UNSET_SUCCESS,
  }
}

