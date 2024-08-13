import { loaderModalTypea } from "./types";
const INITIAL_STATE = {
  // message:{
  //   title:"",
  //   description:""
  // },
  handler:null,
  showModal:false,
  isFal:true
};

const loaderModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loaderModalTypea.TOGGLE_LOADER_MODAL:
      return {
        ...state,
        showModal:action.payload
      }  
      case loaderModalTypea.SET_LOADER:
        return {
          ...state,
          showModal:true
      }  
      case loaderModalTypea.UNSET_LOADER:
        return {
          ...state,
          // handler:null,
          // message:{
          //   title:"",
          //   description:""
          // },
          showModal:false
        }
    

    default:
      return state;
  }
};

export default loaderModalReducer;
