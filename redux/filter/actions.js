import { purchaseOrderTypes } from "./types";
import api from "../../services/api";

export const storePurchaseOrderList = (list,po) => {
  return {
    type: purchaseOrderTypes.STORE_PURCHASE_ORDER_ITEMS_SUCCESS,
    payload: {list,po},
  };
};


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

export const fetchRecent=(token)=>{
  return async(dispatch)=>{
    try {
      let params = { scriptId: "604", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }

      
      const res=await api.getDataWithParams(
          { 
            email:"venu@inspirria.com"
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
      
    } catch (error) {
      console.log('error UPDATING',error)
      
    }
  }
}

export const fetchPODetailsAPI = (po, token) => {
  return (dispatch) => {
    dispatch(clearPurchaseOrder());
    let params = { scriptId: "593", deployId: "1" };
    let query = {
      requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
    };
    api
      .getDataWithParams(
        { purchaseOrderNumber: po },
        "mainUrl",
        params,
        token,
        query
      )
      .then((res) => {
        if (
          res.data?.PurchaseOrder === "Success" &&
          res.data?.Items.length > 0
        ) {
          return dispatch(storePurchaseOrderList(res.data?.Items,po));
        }
      })
      .catch((err) => {
        console.log("error", err);
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


export const updatePoDetails=(token,po,array)=>{
  return async(dispatch)=>{
    try {
      let params = { scriptId: "595", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }

      
      const res=await api.getDataWithParams(
        // { "PurchaseOrderNumber":"5171","Items":[{"itemdescription":"Finishing - Loop, A Grade Non Adhesive Black, 50mmx25m","quantity":1,"quantityreceived":15,"quantitybilled":0,"Uom":"RL","inventorydetailavail":"false"},{"itemdescription":"Finishing - Clear Tape (For Packing)","quantity":1,"quantityreceived":0,"quantitybilled":0,"Uom":"RL","inventorydetailavail":"false"},{"itemdescription":"Test Item for checking inventory Detail on PO","quantity":2,"quantityreceived":0,"quantitybilled":0,"Uom":"Box","inventorydetailavail":",TEST0004,Test0005"}] },
          { "PurchaseOrderNumber":po,
           "Items":[
             ...array
           ]
         },
        "mainUrl",
        params,
        token,
        query
      )

      dispatch(changeUpdatePOStatus(true))
      dispatch(clearUpdatedPurchaseOrder())
      
    } catch (error) {
      console.log('error UPDATING',error)
      dispatch(changeUpdatePOStatus(false))
      
    }
    

  }
}


export const fetchInventoryDetails=(id,token)=>{
  return async (dispatch)=>{ 

    try {
      let params = { scriptId: "559", deployId: "1" };
      let query = {
        requestTrackerId: Math.floor(1000000000 + Math.random() * 900000),
      }
      const res=await api.getDataWithParams(
            {"id":id}
        ,
        "mainUrl",
        params,
        token,
        query
      )
      dispatch({
        type:purchaseOrderTypes.STORE_INVENTORY_DETAIL,
        payload:res.data
      })
      
} catch (error) {
       console.log('error UPDATING',error)
}
       
  }
}
