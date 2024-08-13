import {purchaseOrderTypes} from './types'
const INITIAL_STATE = {
  recentOrdersList:[],
  userDetails:{
    name:"",
    designation:"",
    profileImage:""
  },
  purchaseOrderDetail:{
    vendor:"",
    purchaseOrderNumber:""
  },
  purchaseOrderDetailedList:[],
  allowUserToSeeList:null,
  purchaseOrderToUpdateList:{
    Items:[]
  },
  wasItemUpdated:null,
  inventoryDetails:{}

}

const purchaseOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case purchaseOrderTypes.STORE_PURCHASE_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        purchaseOrderDetailedList:action.payload.list,
        purchaseOrderDetail:{
          ...state.purchaseOrderDetail,
          purchaseOrderNumber:action.payload.po
        },
        allowUserToSeeList:true
      }
    case purchaseOrderTypes.CLEAR_PURCHASE_ORDER_ITEMS:
    case purchaseOrderTypes.FETCH_PURCHASE_ORDER_ITEMS_FAIL:
      return {
        ...state,
        purchaseOrderDetailedList:[],
        allowUserToSeeList:false
      }
    case purchaseOrderTypes.CLEAR_PURCHASE_ORDER_STATUS:
      return {
        ...state,
        allowUserToSeeList:false
      }
    case purchaseOrderTypes.CLEAR_UPDATED_PURCHASE_ORDER:
      return {
        ...state,
        purchaseOrderToUpdateList:{
        Items:[]
        }
      }      
    case purchaseOrderTypes.CHANGE_UPDATE_PURCHASE_ORDER_API_STATUS:
      return {
        ...state,
        wasItemUpdated:action.payload
      }  
    case purchaseOrderTypes.SET_API_PO_LIST:
      return {
        ...state,
             purchaseOrderToUpdateList:{
                ...state.purchaseOrderToUpdateList,
                Items:[
                  ...state.purchaseOrderToUpdateList.Items,
                  {
                    ...action.payload
                  }
                ]
              }
        }
    case purchaseOrderTypes.STORE_RECENT_PURCHASE_ORDER:
      return {
        ...state,
        recentOrdersList:action.payload,
      }
    
    case purchaseOrderTypes.STORE_INVENTORY_DETAIL:
      return {
        ...state,
        inventoryDetails:action.payload,
        allowUserToSeeList:true
      }  
  
  

    default:
      return state;
  }
}


export default purchaseOrderReducer