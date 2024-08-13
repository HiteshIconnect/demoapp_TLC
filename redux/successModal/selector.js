import { createSelector } from 'reselect'

export const selectSuccessData = state => state.successModal



export const selectSuccessModalStatus = createSelector(
  [selectSuccessData],
  (modal) => modal.showModal
)

export const sendSuccessMessage=createSelector(
  [selectSuccessData],
  (modal)=>modal.message
)

export const sendSuccessHandler=createSelector(
  [selectSuccessData],
  (modal)=>modal.handler
)






