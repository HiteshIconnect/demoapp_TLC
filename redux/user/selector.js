import { createSelector } from 'reselect'

export const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)

export const selectTime=createSelector(
  [selectUser],
  (user)=>user.loginSessionTime
)

export const selectToken = createSelector(
  [selectUser],
  (user) => user.loginToken
)

export const getTokenValid=createSelector(
  [selectUser],
  (user)=>user.tokenValid
)

export const sendUserDetails=createSelector(
  [selectUser],
  (user)=>user.userDetails
)

export const selectRememberMe=createSelector(
  [selectUser],
  (user)=>user.rememberMe
)

export const selectPrinterIp=createSelector(
  [selectUser],
  (user)=>user.printerIp
)

export const connectString=createSelector(
  [selectUser],
  (user)=>user.env
)
