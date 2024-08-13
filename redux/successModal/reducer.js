import { successModalTypes } from "./types";
const INITIAL_STATE = {
  message:{
    title:"",
    description:""
  },
  handler:null,
  showModal:false,
};

const successModal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case successModalTypes.TOGGLE_SUCCESS_MODAL:
      return {
        ...state,
        showModal:action.payload
      }  
      case successModalTypes.SET_SUCCESS:
        return {
          ...state,
          handler:action.payload.handler,
          message:{
            title:action.payload.title,
            description:action.payload.desc
          },
          showModal:true
      }  
      case successModalTypes.UNSET_SUCCESS:
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

export default successModal;
