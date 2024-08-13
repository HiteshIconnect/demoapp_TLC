import { createSelector } from 'reselect'

export const selectErrorData = state => state.errorModal



export const selectModalStatus = createSelector(
  [selectErrorData],
  (modal) => modal.showModal
)

export const sendErrorMessage=createSelector(
  [selectErrorData],
  (modal)=>modal.message
)

export const sendHandler=createSelector(
  [selectErrorData],
  (modal)=>modal.handler
)






