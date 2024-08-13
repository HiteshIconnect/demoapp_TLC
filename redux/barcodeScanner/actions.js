import { purchaseOrderTypes } from "./types";
import api from "../../services/api";
import {setError} from '../errorModal/actions'
import { setSuccess } from "../successModal/actions";
//import {allowUserToSeeList} from '../purchaseOrder/actions'
import { setLoader,unsetLoader } from "../loaderModal/actions";

export const storePurchaseOrderList = (list,po) => {
  return {
    type: purchaseOrderTypes.STORE_PURCHASE_ORDER_ITEMS_SUCCESS,
    payload: {list,po},
  };
};
export const allowUserToSeeWO = (val) => {
  return {
    type: purchaseOrderTypes.SHOW_WO,
    payload: val,
  };
};
export const storePurchaseOrderDetails=(ordered,received)=>{
  return {
    type:purchaseOrderTypes.STORE_PURCHASE_QTY_DETAILS,
    payload:{ordered,received}
  }
}

export const storeVendorName=(vendor)=>{
  return {
    type:purchaseOrderTypes.STORE_VENDOR_NAME,
    payload:vendor
  }
}

export const changeReceviedQty=(qty)=>{
  return {
    type:purchaseOrderTypes.CHANGE_RECEIVED_QTY,
    payload:qty
  }
}


export const storePurchaseOrderFail = () => {
  return {
    type: purchaseOrderTypes.FETCH_PURCHASE_ORDER_ITEMS_FAIL,
  };
};

export const clearPurchaseOrder = () => {
  return {
    type: purchaseOrderTypes.CLEAR_PURCHASE_ORDER_ITEMS,
  };
};

export const clearPurchaseOrderStatus = () => {
  return {
    type: purchaseOrderTypes.CLEAR_PURCHASE_ORDER_STATUS,
  };
};

export const clearRecentOrderList=()=>{
  return {
    type:purchaseOrderTypes.CLEAR_RECENT_ORDER
  }
}

export const clearInventoryDetails = () => {
  return {
    type: purchaseOrderTypes.CLEAR_INVENTORY_DETAILS,
  };
};

export const setFetchingStatus=(value)=>{
  return {
    type:purchaseOrderTypes.SET_FETCHING_STATUS,
    payload:value
  }
}


export const clearUpdatedPurchaseOrder=()=>{
  return {
    type:purchaseOrderTypes.CLEAR_UPDATED_PURCHASE_ORDER
  }
}

export const changeUpdatePOStatus=(value)=>{
  return {
    type:purchaseOrderTypes.CHANGE_UPDATE_PURCHASE_ORDER_API_STATUS,
    payload:value

  }
}


export const setUpdatePoList=(item)=>{
  return {
    type:purchaseOrderTypes.SET_API_PO_LIST,
    payload:item
  }
}


export const postScannedBarcodes=(workOrderList, currentRole, email,token)=>{
  console.log("workOrderList-->>",workOrderList);

  return async(dispatch,getState)=>{
    const {env} = getState().user;
    try {
      dispatch(setLoader())
      const payload = {"Role": currentRole,"WorkOrderNumber": workOrderList, "email": email}
      let params = env === 'sandbox' ? { scriptId:  "838", deployId: "1" } : { scriptId: "838", deployId: "1" } ;
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res=await api.getDataWithParams(
        payload,
        "mainUrl",
        params,
        token,
        query,
      )
      dispatch(unsetLoader());
      console.log("response from quick view API",res.data);

      if(res.data.Error){
        dispatch(setFetchingStatus(null));
        dispatch(allowUserToSeeWO(false))
        return dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong work order.',''))
      }
      dispatch({
        type:purchaseOrderTypes.STORE_RECENT_PURCHASE_ORDER,
        payload:res.data["WO_details"]
      })
      dispatch({
        type:purchaseOrderTypes.SET_SALES_ORDER,
        payload:{
          salesOrderNo:res.data["SalesORder"],
          totalCount:res.data["Total Array"]
        }
      })
      dispatch(setFetchingStatus(null));
      dispatch(allowUserToSeeWO(true))
    } catch (error) {
      console.log('error UPDATING',error);
      dispatch(unsetLoader());
      dispatch(setFetchingStatus(null));
      dispatch(allowUserToSeeWO(false))
      dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong work Order.',''))      
    }
  }
}

export const fetchInventoryDetails=(id,token)=>{
  return async (dispatch)=>{ 

    try {
      dispatch(setLoader())
      let params = { scriptId: "648", deployId: "1" };
      const prodParams = { scriptId: "735", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res=await api.getDataWithParams(
        {"ITEMNAME":id}
        ,
        "mainUrl",
        params,
        token,
        query
      )

      if(res.data=="" || res.status!=200){
        dispatch(unsetLoader())
        return dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong Inventory id.',''))
      }
      dispatch({
        type:purchaseOrderTypes.STORE_INVENTORY_DETAIL,
        payload:res.data
      })
      dispatch(unsetLoader())
      
    } catch (error) {
        dispatch(unsetLoader())
       dispatch(setError('Server error','Looks like something went wrong.',''))
       console.log('error UPDATING',error)
    }
  }
}
