import { createSelector } from 'reselect'

export const purchase = state => state.purchaseOrder


export const selectPurchaseList = createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.purchaseOrderDetailedList
)


export const selectRecentPOList = createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.recentOrdersList
)


export const selectPoNumber = createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.purchaseOrderDetail.purchaseOrderNumber
)

// export const selectPoNumber = createSelector(
//   [selectPoDetail],
//   (userDetail) => userDetail.purchaseOrderDetail
// )


export const selectPurchaseListStatus=createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.allowUserToSeeList
)

export const selectUpdatAPIStatus=createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.wasItemUpdated
)


export const selectInventoryDetails=createSelector(
  [purchase],
  (selectPurchaseOrder) => selectPurchaseOrder.inventoryDetails
)


export const selectPoArrayToSend=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.purchaseOrderToUpdateList.Items
)


export const selectPurchaseOrderDetails=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.purchaseOrderDetail
)

export const selectPOUpdatedStatus=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.wasItemUpdated
)

export const selectVendorName=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.purchaseOrderDetail.vendor
)


export const selectRecntAPIFetchStatus=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.fetchedRecentAPI
)

export const salesOrderNoI=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.salesOrderNo
)

export const totalCount=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.totalCount
)
export const showWO=createSelector(
  [purchase],
  (selectPurchaseOrder)=>selectPurchaseOrder.showWO
)
// export const sendQtyPercentages=createSelector(
//   [selectPurchaseOrderDetails],
//   (details)=>{
//     let totalOrdered=details.
//   }
// )


