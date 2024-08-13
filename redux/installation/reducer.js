import {installationTypes} from './types'
const INITIAL_STATE = {
 toUpdateList:[],
 images:[],
 keysToAddImage:[],
 selectedItems:[],
 imageUploaded: {isCamera:false,isGallery:false}
}

const installationOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case installationTypes.STORE_ITEMS_WITH_IMAGE_LIST:
      return {
        ...state,
        toUpdateList:action.payload
      }
      case installationTypes.STORE_IMAGES:
        return {
          ...state,
          imageUploaded: action.payload
        }
      case installationTypes.STORE_LIST_KEYS:
        return {
          ...state,
          keysToAddImage:action.payload
        }  
      case installationTypes.STORE_SELECTED_ITEMS:
        return {
          ...state,
          selectedItems:[
            ...state.selectedItems,
            ...action.payload
          ]
        }  
    // case purchaseOrderTypes.STORE_PURCHASE_ORDER_ITEMS_SUCCESS:
    //   return {
    //     ...state,
    //     purchaseOrderDetailedList:action.payload.list,
    //     purchaseOrderDetail:{
    //       ...state.purchaseOrderDetail,
    //       purchaseOrderNumber:action.payload.po
    //     },
    //     allowUserToSeeList:true
    //   }
    // case purchaseOrderTypes.CLEAR_PURCHASE_ORDER_ITEMS:
    // case purchaseOrderTypes.FETCH_PURCHASE_ORDER_ITEMS_FAIL:
    //   return {
    //     ...state,
    //     purchaseOrderDetailedList:[],
    //     allowUserToSeeList:false
    //   }
    // case purchaseOrderTypes.CLEAR_PURCHASE_ORDER_STATUS:
    //   return {
    //     ...state,
    //     allowUserToSeeList:false
    //   }
    // case purchaseOrderTypes.CLEAR_UPDATED_PURCHASE_ORDER:
    //   return {
    //     ...state,
    //     purchaseOrderToUpdateList:{
    //     Items:[]
    //     }
    //   }      
    // case purchaseOrderTypes.CHANGE_UPDATE_PURCHASE_ORDER_API_STATUS:
    //   return {
    //     ...state,
    //     wasItemUpdated:action.payload
    //   }  
    // case purchaseOrderTypes.SET_API_PO_LIST:
    //   return {
    //     ...state,
    //          purchaseOrderToUpdateList:{
    //             ...state.purchaseOrderToUpdateList,
    //             Items:[
    //               ...state.purchaseOrderToUpdateList.Items,
    //               {
    //                 ...action.payload
    //               }
    //             ]
    //           }
    //     }
  
  

    default:
      return state;
  }
}


export default installationOrderReducer