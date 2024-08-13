import { createSelector } from 'reselect'

export const installation = state => state.install

export const selectInstallList=createSelector(
  [installation],
  (installationDetails)=>installationDetails.toUpdateList
)

export const selectKeys=createSelector(
  [installation],
  (installationDetails)=>installationDetails.toUpdateList
)

export const selectImages=createSelector(
  [installation],
  (installationDetails)=>installationDetails.images
)

export const imageUploaded=createSelector(
  [installation],
  (installationDetails)=>installationDetails.imageUploaded
)



