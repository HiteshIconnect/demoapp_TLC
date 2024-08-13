import { StyleSheet } from "react-native";
import {actuatedNormalize} from './dynamicFonts'

export const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: '5%',
    paddingRight: '10%',
    width: '100%',
    height: '100%'
  },
  header: { // this shape is a circle 
    borderRadius: 100, // border borderRadius same as width and height
    width: '200%',
    height: 100,
    marginLeft: -200, // reposition the circle inside parent view
    position: 'absolute',
    top: 0, // show the bottom part of circle
    backgroundColor: 'black' // hide not important part of image
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50
  },
  buttonLayout: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#E11D38",
    width: "88%",
    height: 90,
    flexDirection: 'column',
    paddingLeft: 18,
    justifyContent: 'center',
    // overflow:"hidden"
  },
  disabled:{
    backgroundColor: "grey"
  },
  buttonText: {
    fontSize: actuatedNormalize(16),
    color: "#FFFFFF",
    fontFamily: 'Poppins-SemiBold'
  },
  supportingText: {
    marginTop: 4,
    fontSize: actuatedNormalize(12),
    color: "#FFFFFF",
    fontFamily: 'Poppins',
  },
  makeMarginTop20: {
    marginTop: 20
  },
  bubbleContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E11D38",
    position: 'absolute',
    right: -30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    width: 90,
    height: 95,
    backgroundColor: 'white',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pushDesignationUp:{bottom:'10%'}
});
