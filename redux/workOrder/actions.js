import { workOrderTypes } from "./types";
import {purchaseOrderTypes} from '../purchaseOrder/types'
import api from "../../services/api";
import {setError} from '../errorModal/actions'
import { setSuccess,unsetSuccess } from "../successModal/actions";
import {allowUserToSeeList,setFetchingStatus} from '../purchaseOrder/actions'
import { setLoader,unsetLoader } from "../loaderModal/actions";


//the recent list must be stored in redux->purchaseOrder->recentOrdersList
//create action if not there in purchaseOrder and use it here when we fetch the recent list from api
//please refer recent APIS in purchaseOrder actions

export const storeWorkOrderList=(list)=>{
  return {
    type:workOrderTypes.STORE_WORK_ORDER,
    payload:list
  }
}
export const updateSalesOrder = (soNo) => {
  return{
    type: workOrderTypes.UPDATE_SALES_ORDER,
    payload: soNo
  }
}
export const fetchWorkOrderDetails = (wo, token,email,role,soNo) => {

  console.log("payload for SO: ",soNo)
  return (dispatch,getState) => {
    const {env} = getState().user;
    console.log("env",env);
    let sample={"SalesOrderNumber": soNo,"email": email,"Role": role}
    let params = env === 'sandbox' ? { scriptId: "835", deployId: "1" } : { scriptId: "835", deployId: "1" } ;
    let query = {
      requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
    };
    dispatch(unsetSuccess())
    dispatch(setLoader())
    api
      .getDataWithParams(
        sample,
        "mainUrl",
        params,
        token,
        query
      )
      .then((res) => {
        console.log("Response for SO fecth: ",res)
        dispatch(unsetLoader())
        if(res.data.Error || res.data.Message !=="WO details fetched successfully" || res.data.Message !=="WO details fetched successfully"){
          dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong sales Order.',''))
          dispatch(storeWorkOrderList([]))
          dispatch(allowUserToSeeList(false))
          return
        }

        dispatch(storeWorkOrderList(res.data))
        dispatch(updateSalesOrder(soNo))
        dispatch(allowUserToSeeList(true))
       
      })
      .catch((err) => {
        dispatch(unsetLoader())
        dispatch(setError('Sorry its incorrect','It Looks like something is wrong with the Server.',''))
        console.log("error", err);
        dispatch(storeWorkOrderList([]))
        dispatch(allowUserToSeeList(false))
      });
  };
};

export const fetchRecentWorkOrder=(token,email)=>{
  return async(dispatch,getState)=>{
    const {env} = getState().user;
    try {
       let params = env === 'sandbox' ? { scriptId: "741", deployId: "1" } : { scriptId: "741", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }

      dispatch(setLoader())
      const res=await api.getDataWithParams(
          { 
            email
         },
        "mainUrl",
        params,
        token,
        query
      )
      dispatch({
        type:purchaseOrderTypes.STORE_RECENT_PURCHASE_ORDER,
        payload:res.data["WO ID LIST"]
      })
      dispatch(unsetLoader())
      dispatch(setFetchingStatus(null))
      
    } catch (error) {
      console.log('error UPDATING',error)
      dispatch(setFetchingStatus(null))
      dispatch(unsetLoader())
    }
  }
}
export const fetchRecentSalesOrder=(token,email)=>{
  
  return async(dispatch,getState)=>{
    const {env} = getState().user;
    try {
       let params = env === 'sandbox' ? { scriptId: "740", deployId: "1" } : { scriptId: "740", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      dispatch(setLoader())
      
      const res=await api.getDataWithParams(
          { 
            email
         },
        "mainUrl",
        params,
        token,
        query
      )
      dispatch({
        type:purchaseOrderTypes.STORE_RECENT_PURCHASE_ORDER,
        payload:res.data["WO ID LIST"]
      })
      dispatch(unsetLoader())
      dispatch(setFetchingStatus(null))
      
    } catch (error) {
      console.log('error UPDATING',error)
      dispatch(setFetchingStatus(null))
      dispatch(unsetLoader())
    }
  }
}

export const updateWODetails = (data,token) => {

  console.log("updateWODetails :",data);
  return async (dispatch,getState) => {
    const {env} = getState().user;
    dispatch(setLoader())
    try{
      let params = env === 'sandbox' ? { scriptId: "834", deployId: "1" } : { scriptId: "834", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res =  await api.getDataWithParams( 
          data,
          "mainUrl",
          params,
          token,
          query);
          await dispatch(unsetLoader())
          await dispatch(setSuccess('Success','Items Updated Successfully',''))
    }catch(error){
      dispatch(unsetLoader())
      console.log('error update wo')
      dispatch(setError('error update wo'))
    }
  }
}