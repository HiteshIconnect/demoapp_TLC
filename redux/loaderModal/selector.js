import { createSelector } from 'reselect'

export const selectLoaderData = state => state.loaderModal



export const selectLoaderModalStatus = createSelector(
  [selectLoaderData],
  (modal) => {
    return modal.showModal
  }
)

export const sendLoaderMessage=createSelector(
  [selectLoaderData],
  (modal)=>modal.message
)

export const sendLoaderHandler=createSelector(
  [selectLoaderData],
  (modal)=>modal.handler
)






