import { captureModalType } from "./types";
const INITIAL_STATE = {
  handler:null,
  showModal:false,
};

const captureModal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case captureModalType.TOGGLE_CAPTURE_MODAL:
      return {
        ...state,
        showModal:action.payload
      }  
      // case captureModalType.SET_CAPTURE_MODAL:
      //   return {
      //     ...state,
      //     handler:action.payload.handler,
      //     showModal:true
      // }  
      case captureModalType.UNSET_CAPTURE_MODAL:
        return {
          ...state,
          // handler:null,
          showModal:false
        }
    

    default:
      return state;
  }
};

export default captureModal;
