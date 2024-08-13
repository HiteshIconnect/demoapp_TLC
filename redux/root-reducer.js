import { combineReducers } from "redux";
import { persistReducer, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "./user/reducer";
import purchaseOrderReducer from "./purchaseOrder/reducer";
import errorModalReducer from './errorModal/reducer'
import successModalReducer from './successModal/reducer'
import captureModalReducer from "./captureModal/reducer";
import installationOrderReducer from "./installation/reducer";
import workOrderReducer from './workOrder/reducer'
import loaderModalReducer from './loaderModal/reducer'
import createFilter, {
  createWhitelistFilter,
  createBlacklistFilter
} from "redux-persist-transform-filter";

//we want to store the token in async storage
//thats why we create a filter for only adding loginToken
const userFilter = createWhitelistFilter("user", ["userDetails","rememberMe","printerIp"]);
const saveSubsetBlacklistFilter = createBlacklistFilter(
  'loaderModal',
  ['keyYouDontWantToSave1', 'keyYouDontWantToSave2']
);
//tells which things to store locally
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ['user'] ,
  transforms: [userFilter],
  blacklist: ['loaderModal','purchaseOrder','workOrder']
};

const rootReducer = combineReducers({
  user: userReducer,
  purchaseOrder: purchaseOrderReducer,
  install:installationOrderReducer,
  errorModal:errorModalReducer,
  loaderModal:loaderModalReducer,
  successModal:successModalReducer,
  captureModal:captureModalReducer,
  workOrder:workOrderReducer
});

export default persistReducer(persistConfig, rootReducer);
