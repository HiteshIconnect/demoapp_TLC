import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import Home from '../screens/HomeScreen'

import Login from '../screens/Login'
import Dashboard from '../screens/DashBoard'
import PurchaseOrder from '../screens/PurchaseOrder'
import PurchaseOrderList from '../screens/PurchaseOrderlist'
import PrintLabel from '../screens/PrintLabel'
import BarcodeScanner from '../screens/BarcodeScanner'
import InventoryDetailPage from '../screens/InventoryDetailPage';
import ProductionStatus from '../screens/ProductionStatus';
import ProductionDetails from '../screens/ProductionDetails'
import ProductionItemDetail from '../screens/ProductionItemDetail'
import InstallationPickup from '../screens/InstallationPickup'
import InstallationUpdate from '../screens/InstallationUpdate'
import InstallationStatus from '../screens/InstallationStatus'
import InstallationCamera from '../screens/InstallationCamera'
import InstallationItemDetail from '../screens/InstallationItemDetail'
import BarcodeScannerInstall from '../screens/BarcodeScannerInstall'
import SecurityItemDetails from '../screens/SecurityItemDetails'

let screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  DashBoard: {
    screen: Dashboard,
    navigationOptions: {
      headerShown: false,
    }
  },
  PurchaseOrder: {
    screen: PurchaseOrder,
    navigationOptions: {
      headerShown: false,
    }
  },
  PurchaseOrderList: {
    screen: PurchaseOrderList,
    navigationOptions: {
      headerShown: false,
    }
  },
  PrintLabel: {
    screen: PrintLabel,
    navigationOptions: {
      headerShown: false,
    }
  },
  InventoryDetailPage: {
    screen: InventoryDetailPage,
    navigationOptions: {
      headerShown: false,
    }
  },
  BarcodeScanner: {
    screen: BarcodeScanner,
    navigationOptions: {
      headerShown: false,
    }
  },
  ProductionStatus: {
    screen: ProductionStatus,
    navigationOptions: {
      headerShown: false,
    }
  },
  ProductionDetails: {
    screen: ProductionDetails,
    navigationOptions: {
      headerShown: false,
    }
  },
  ProductionItemDetail: {
    screen: ProductionItemDetail,
    navigationOptions: {
      headerShown: false,
    }
  },
  InstallationPickup: {
    screen: InstallationPickup,
    navigationOptions: {
      headerShown: false,
    }
  },
  InstallationUpdate: {
    screen: InstallationUpdate,
    navigationOptions: {
      headerShown: false,
    }
  },
  InstallationStatus: {
    screen: InstallationStatus,
    navigationOptions: {
      headerShown: false,
    }
  },
  InstallationCamera: {
    screen: InstallationCamera,
    navigationOptions: {
      headerShown: false,
    }
  },
  SecurityItemDetails:{
    screen:SecurityItemDetails,
    navigationOptions: {
      headerShown: false,
    }
  },
  InstallationItemDetail: {
    screen: InstallationItemDetail,
    navigationOptions: {
      headerShown: false,
    }
  },
  BarcodeScannerInstall: {
    screen: BarcodeScannerInstall,
    navigationOptions: {
      headerShown: false,
    }
  },
 

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)