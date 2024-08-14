import { UserActionTypes } from "./types";
import api from "../../services/api";
import {setError} from '../errorModal/actions'
import { setLoader,unsetLoader } from "../loaderModal/actions";

export const setEnv = (env) => {
  return {
    type: UserActionTypes.SET_ENV,
    payload: env,
  };
};
export const setCurrentUser = (user) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

export const loginFail = () => {
  return {
    type: UserActionTypes.LOGIN_FAIL,
  };
};

export const loginSuccess = () => {
  return {
    type: UserActionTypes.LOGIN_SUCCESS,
  };
};

export const storeToken = (token) => {
  return {
    type: UserActionTypes.SET_LOGIN_TOKEN,
    payload: token,
  };
};

export const storeUserDetails=(name,email,role,currentRole)=>{
  return {
    type:UserActionTypes.SET_USER_DETAILS,
    payload:{
       name,
       email,
       role,
       currentRole
    }
  }
}

export const storeRememberMe=(value)=>{
  return {
    type:UserActionTypes.SET_REMEMBER_ME,
    payload:value
  }
}

export const setTokenStatus = (value) => {
  return {
    type: UserActionTypes.SET_TOKEN_STATUS,
    payload: value,
  };
};

export const loginUser = (creds,rememberMe) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch(setLoader())
      console.log('creds---------',creds)
      res = await api.postData(creds, "login");
      if (res.status !== 200) {
        return dispatch(loginFail());
      }

      const resData=res.data
      const UserDetails=resData.data.UserDetails
      await dispatch(storeUserDetails(UserDetails['User Name'],UserDetails?.Email,UserDetails?.Role,UserDetails?.CurrentRole))
      await dispatch(storeToken(resData?.accessToken))
      if(rememberMe){
        dispatch(storeRememberMe(true))
      }else{
        dispatch(storeRememberMe(false))
      }
      dispatch(unsetLoader())
      return dispatch(loginSuccess());
    } catch (error) {
      console.log('err',error)
      dispatch(unsetLoader())
      dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong username or password.',''))
      dispatch(loginFail());
    }
  };
};


export const checkSessionValidation=()=>{
  return (dispatch,getState)=>{

    const loginTime=getState().user.loginSessionTime
    const now=new Date()

    if(now>loginTime){
      return dispatch(loginFail())
    }
  }
}

export const verifyToken = (loginToken) => {
  return async (dispatch) => {
    try {
      const res = await api.getData(`Bearer ${loginToken}`, "loginStatus");
      if (res.status == 200) {
        dispatch(setTokenStatus(true));
        await dispatch(loginSuccess());
      }    
    } catch (error) {
      await dispatch(loginFail());
    }
  };
};

export const resetUser = () => {
  return {
    type: UserActionTypes.RESET_USER,
  };
};

export const setPrinterIp=(value)=>{
  return {
    type:UserActionTypes.SAVE_PRINTER_IP,
    payload:value
  }
}
