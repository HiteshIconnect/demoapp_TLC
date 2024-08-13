import {workOrderTypes} from './types'
const INITIAL_STATE = {
  userDetails:{
    name:"",
    designation:"",
    profileImage:""
  },
  salesOrderDetail:{
    vendor:"",
    salesOrderNumber:"SO-2021-00001",
  },
  workOrderDetailedList:[],
  totalStatusList: [],
  workOrderToUpdateList:{
    Items:[]
  },

}

const workOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
     case workOrderTypes.STORE_WORK_ORDER:
       return {
         ...state,
         workOrderDetailedList:action.payload["WO_details"],
         totalStatusList: action.payload['Total Array']
       }
      case workOrderTypes.UPDATE_SALES_ORDER:
        return{
          ...state,
          salesOrderDetail: {...state.salesOrderDetail,salesOrderNumber: action.payload}
        }
    default:
      return state;
  }
}


export default workOrderReducer