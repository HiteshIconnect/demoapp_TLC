import { createSelector } from 'reselect'

export const workOrder = state => state.workOrder

export const selectWorkOrderList=createSelector(
    [workOrder],
    (workOrder)=>workOrder.workOrderDetailedList
)
export const statusList=createSelector(
    [workOrder],
    (workOrder)=>workOrder.totalStatusList
)

export const salesOrderNo = createSelector(
    [workOrder],
    (workOrder) => workOrder.salesOrderDetail.salesOrderNumber
)

