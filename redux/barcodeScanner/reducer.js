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
    purchaseOrderNumber:"",
    total:0,
    received:0
  },
  purchaseOrderDetailedList:[],
  allowUserToSeeList:null,
  purchaseOrderToUpdateList:{
    Items:[]
  },
  wasItemUpdated:null,
  inventoryDetails:{},
  fetchedRecentAPI:null,
  salesOrderNo: "",
  showWO:false

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
    case purchaseOrderTypes.SHOW_WO:
      return {
        ...state,
        showWO:action.payload
      }
    case purchaseOrderTypes.CLEAR_UPDATED_PURCHASE_ORDER:
      return {
        ...state,
        purchaseOrderToUpdateList:{
        Items:[]
        }
      }
    case purchaseOrderTypes.CLEAR_RECENT_ORDER:
      return {
        ...state,
        recentOrdersList:[]
      }        
    case purchaseOrderTypes.CHANGE_UPDATE_PURCHASE_ORDER_API_STATUS:
      return {
        ...state,
        wasItemUpdated:action.payload
      }  
    case purchaseOrderTypes.SET_API_PO_LIST:
      return {
        ...state,
        purchaseOrderDetailedList :[
          ...action.payload
        ]
            //  purchaseOrderToUpdateList:{
            //     ...state.purchaseOrderToUpdateList,
            //     Items:[
            //       ...state.purchaseOrderToUpdateList.Items,
            //       {
            //         ...action.payload
            //       }
            //     ]
            //   }
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
    // case purchaseOrderTypes.CLEAR_INVENTORY_DETAILS:
    //   return {
    //     ...state,
    //     inventoryDetails:{}
    //   }  
    case purchaseOrderTypes.STORE_PURCHASE_QTY_DETAILS:
      return {
        ...state,
        purchaseOrderDetail:{
          ...state.purchaseOrderDetail,
          total:action.payload.ordered,
          received:action.payload.received
        }
      }  
    case purchaseOrderTypes.CHANGE_RECEIVED_QTY:
      return {
        ...state,
        purchaseOrderDetail:{
          ...state.purchaseOrderDetail,
          received:parseInt(state.purchaseOrderDetail.received)+action.payload
        }
      }  

    case purchaseOrderTypes.STORE_VENDOR_NAME:
      return {
        ...state,
        purchaseOrderDetail:{
          ...state.purchaseOrderDetail,
          vendor:action.payload
        }
      }  
    case purchaseOrderTypes.SET_FETCHING_STATUS:
      return {
        ...state,
        fetchedRecentAPI:action.payload
      }  

    case purchaseOrderTypes.ALLOW_TO_SEE_LIST:
      return {
        ...state,
        allowUserToSeeList:action.payload
      }  
    
     case purchaseOrderTypes.SET_SALES_ORDER:
      return {
        ...state,
        salesOrderNo: action.payload,
        showWO: true
      }

    default:
      return state;
  }
}


export default purchaseOrderReducer