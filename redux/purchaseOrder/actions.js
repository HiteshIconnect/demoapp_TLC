import { purchaseOrderTypes } from "./types";
import api from "../../services/api";
import {setError} from '../errorModal/actions'
import { setSuccess } from "../successModal/actions";
import { setLoader,unsetLoader } from "../loaderModal/actions";

export const storePurchaseOrderList = (list,po) => {
  return {
    type: purchaseOrderTypes.STORE_PURCHASE_ORDER_ITEMS_SUCCESS,
    payload: {list,po},
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

export const fetchRecent=(token,email)=>{
  return async(dispatch,getState)=>{
     const {env} = getState().user;
    try {
      dispatch(setLoader())
      let params = env === 'sandbox' ? { scriptId: "734", deployId: "1" } : { scriptId: "734", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }

      
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
        payload:res.data["PO ID LIST"]
      })
      dispatch(unsetLoader())
      dispatch(setFetchingStatus(null))
      
    } catch (error) {
      console.log('error UPDATING',error)
      dispatch(unsetLoader())
      dispatch(setFetchingStatus(null))
      
    }
  }
}


export const fetchRecentInventory=(token,email)=>{
  return async(dispatch,getState)=>{
     const {env} = getState().user;
    try {
      dispatch(setLoader())
      let params = env === 'sandbox' ? { scriptId: "737", deployId: "1" } : { scriptId: "737", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res=await api.getDataWithParams(
          { 
            email
         },
        "mainUrl",
        params,
        token,
        query
      )
      dispatch(unsetLoader())
      dispatch({
        type:purchaseOrderTypes.STORE_RECENT_PURCHASE_ORDER,
        payload:res.data["ITEM  LIST"]
      })
      dispatch(setFetchingStatus(null))
      
    } catch (error) {
      console.log('error UPDATING',error)
      dispatch(unsetLoader())
      dispatch(setFetchingStatus(null))
    }
  }
}

export const fetchPODetailsAPI = (po, token,email) => {
  console.log("PO",po,email);
  return (dispatch,getState) => {
     const {env} = getState().user;
    dispatch(setLoader())

    dispatch(clearPurchaseOrder());
    const purchaseOrderNumber = {"purchaseOrderNumber": po,"email": email}
    let params = env === 'sandbox' ? { scriptId: "731", deployId: "1" } : { scriptId: "731", deployId: "1" };
    let query = {
      requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
    };
    api
      .getDataWithParams(
        purchaseOrderNumber,//{ purchaseOrderNumber: po,email },
        "mainUrl",
        params,
        token,
        query
      )
      .then((res) => {
        
        if(res.data=="INvalid PurchaseOrder Number"){
          dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong Purchase Order.',''))
          dispatch(unsetLoader())
          return
        }
        if(res.data.ERROR){
          dispatch(setError('Sorry its incorrect',res.data.ERROR,''))
          dispatch(unsetLoader())
          return
        }
        if (
          res.data?.PurchaseOrder === "Success" &&
          res.data?.Items.length > 0
        ) {
          let totalReceived=res.data?.Items.reduce((acc,curr)=>{
            return parseInt(curr.quantityreceived)+acc
          },0)
          dispatch(storePurchaseOrderDetails(res.data["total quantity"],totalReceived))
          dispatch(storePurchaseOrderList(res.data?.Items,po));
          dispatch(storeVendorName(res.data?.vendor))
          dispatch(unsetLoader())
        }
      })
      .catch((err) => {
        dispatch(setError('Sorry its incorrect','It Looks like something is wrong with the Server.',''))
        console.log("error", err);
        dispatch(unsetLoader())
        return dispatch(storePurchaseOrderFail());
      });
  };
};

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


export const updatePoDetails=(token,orderNumber,list,email,currentRole)=>{
  console.log("currentRole: ",currentRole);
  console.log("orderNumber: ",orderNumber);
  console.log("list: ",list);

  return async(dispatch,getState)=>{
    const {env} = getState().user;
    try {
      dispatch(setLoader())
      let params = env === 'sandbox' ? { scriptId: "733", deployId: "1" } : { scriptId: "733", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }

      let payload={
        PurchaseOrderNumber:orderNumber,
        Items:list.map((item)=>{
          if(!isNaN(item.totalQty)){
            return item
          }else{
            return {
              ...item,
              totalQty:0
            }
          }
        }),
        email:email,
        Role: currentRole
      }

      const res=await api.getDataWithParams(
        payload,
        "mainUrl",
        params,
        token,
        query
      )
      
      //console.log("RESPONSE PO UPDATE: ",res)
      if(res.data.Message=="Item receipt creation failed"){
        dispatch(unsetLoader())
        dispatch(setError('Fail','It Looks like you entered something incorrect.',''))
        return
      }
      
      dispatch(changeUpdatePOStatus(true))
      dispatch(clearUpdatedPurchaseOrder())
      dispatch(clearRecentOrderList())
      dispatch(unsetLoader())
      //setTimeout(()=>{
      await dispatch(setSuccess('Success','Line items Updated Successfully',""))
      //},3000)
    } catch (error) {

      console.log('error UPDATING',error)
      dispatch(unsetLoader())
      dispatch(setError('Sorry its incorrect','It Looks like something is wrong with the Server.',''))
      // dispatch(changeUpdatePOStatus(false))
      
    }
  }
}


export const fetchInventoryDetails=(id,token,handler)=>{

  console.log("------payload for Inv transfer------")
  console.log(id);
  console.log(handler)

  return async (dispatch,getState)=>{ 
    const {env} = getState().user;

    try {
      dispatch(setLoader())
      let params = env === 'sandbox' ? { scriptId: "735", deployId: "1" } : { scriptId: "735", deployId: "1" };
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

      console.log("----response for Inv Transfer----")
      console.log(res.data);

      if(res.data=="" || res.status!=200){
        dispatch(unsetLoader())
        //if(setScanned) setScanned(false);
        return dispatch(setError('Sorry its incorrect','It Looks like you entered a wrong Inventory id.',handler));
        
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

export const updateInventory=(data,token)=>{

  console.log("payload for update Inventory : ",data);

  return async (dispatch,getState)=>{ 
    const {env} = getState().user;
    try {
      dispatch(setLoader())
      let params = env === 'sandbox' ? { scriptId: "736", deployId: "1" } : { scriptId: "736", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res=await api.getDataWithParams(
        data,
        "mainUrl",
        params,
        token,
        query
      )
      console.log("---Response for Update Inventory---")
      console.log(res);
      if(res.data=="success"){
        console.log('ran the aAPI successfully')
        dispatch(changeUpdatePOStatus(true))
        dispatch(clearRecentOrderList())
        dispatch(unsetLoader())
        //setTimeout(()=>{
        dispatch(setSuccess('Success','Inventory Items updated successfully',""))
        //},1000)
      }else{
        dispatch(setError('Fail','It Looks like you entered something incorrect.',''))
      }
      
  } catch (error) {
      dispatch(unsetLoader())
      dispatch(setError('Fail','Server Error ',''))
      console.log('error UPDATING',error)
    }
        
  }
}

//reusable actions across others

export const allowUserToSeeList=(value)=>{
  return {
    type:purchaseOrderTypes.ALLOW_TO_SEE_LIST,
    payload:value
  }
}
