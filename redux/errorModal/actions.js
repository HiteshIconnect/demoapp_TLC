import { errorModalTypes } from "./types";
import api from "../../services/api";


export const setModal = (value) => {
  return {
    type: errorModalTypes.TOGGLE_MODAL,
    payload: value,
  };
};

export const setError=(title,desc,handler)=>{
  return {
    type:errorModalTypes.SET_ERROR,
    payload:{
      title,
      desc,
      handler 
  }
}}

export const unsetError=()=>{
  return {
    type:errorModalTypes.UNSET_ERROR,
  }
}

