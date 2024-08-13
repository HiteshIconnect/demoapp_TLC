import { createAppContainer,createSwitchNavigator } from "react-navigation";

import HomeStack from './homeStack'
import CameraStack from './cameraStack'

const switchNavigator = createSwitchNavigator({
  Home: HomeStack,
  Camera:CameraStack
  
})

export default createAppContainer(switchNavigator)