import { errorModalTypes } from "./types";
const INITIAL_STATE = {
  message:{
    title:"",
    description:""
  },
  handler:null,
  showModal:false,
};

const errorModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case errorModalTypes.TOGGLE_MODAL:
      return {
        ...state,
        showModal:action.payload
      }  
      case errorModalTypes.SET_ERROR:
        return {
          ...state,
          handler:action.payload.handler,
          message:{
            title:action.payload.title,
            description:action.payload.desc
          },
          showModal:true
      }  
      case errorModalTypes.UNSET_ERROR:
        return {
          ...state,
          handler:null,
          message:{
            title:"",
            description:""
          },
          showModal:false
        }
    

    default:
      return state;
  }
};

export default errorModalReducer;
