import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CameraApp from '../screens/CameraApp'
import PreviewScreen from '../screens/PreviewScreen'

let screens = {
  Camera: {
    screen: CameraApp
  },
  Preview: {
    screen: PreviewScreen
  }

}

const CamerStack = createStackNavigator(screens)

export default createAppContainer(CamerStack)