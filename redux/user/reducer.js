import { UserActionTypes } from "./types";
import {setTimeLogin} from './utils'

const INITIAL_STATE = {
  currentUser: null,
  userDetails:{
    fullName:"",
    role:"",
    email:"",
    currentRole:""
  },
  loginSessionTime:null,
  loginToken: null,
  tokenValid: null,
  rememberMe:false,
  env: 'sandbox',
  printerIp:'172.25.12.132'
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.LOGIN_FAIL:
      return {
        ...state,
        currentUser: null,
        loginSessionTime:null
        // loginToken: null,
      };

    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: true,
        loginSessionTime:setTimeLogin()
      };
    case UserActionTypes.SET_LOGIN_TOKEN:
      return {
        ...state,
        loginToken: action.payload,
      };
    case UserActionTypes.RESET_USER:
      return {
        ...state,
        currentUser: null,
        loginToken: null,
        tokenValid: null,
      };

    case UserActionTypes.SET_TOKEN_STATUS:
      return {
        ...state,
        tokenValid: action.payload,
      };
    case UserActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          fullName:action.payload.name,
          role:action.payload.role,
          email:action.payload.email,
          currentRole:action.payload.currentRole
        }  
      }
    case UserActionTypes.SET_REMEMBER_ME:
      return {
        ...state,
        rememberMe:action.payload
      }
    case UserActionTypes.SET_ENV:
      return {
        ...state,
        env: action.payload
      }
    case UserActionTypes.SAVE_PRINTER_IP:
        return {
          ...state,
          printerIp:action.payload
      }  
    default:
      return state;
  }
};

export default userReducer;
