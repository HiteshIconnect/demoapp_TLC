import { createSelector } from 'reselect'

export const selectSuccessData = state => state.captureModal



export const sendCaptureModalStatus = createSelector(
  [selectSuccessData],
  (modal) => modal.showModal
)


// export const sendCaptureModalStatusHandler=createSelector(
//   [selectSuccessData],
//   (modal)=>modal.handler
// )






