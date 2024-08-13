import { loaderModalTypea } from "./types";
import api from "../../services/api";

//may not be used
export const setLoaderModal = (value) => {
  return {
    type: loaderModalTypea.TOGGLE_LOADER_MODAL,
    payload: value,
  };
};

export const setLoader=(title,desc,handler)=>{
  return {
    type:loaderModalTypea.SET_LOADER,
    // payload:{
    //   title,
    //   desc,
    //   handler
    // }
  }
}

export const unsetLoader=()=>{
  return {
    type:loaderModalTypea.UNSET_LOADER,
  }
}

