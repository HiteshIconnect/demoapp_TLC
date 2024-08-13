import { StyleSheet, Dimensions } from "react-native";
import { actuatedNormalize } from './dynamicFonts';
 
const { width, height } = Dimensions.get("window");
 
export const headerStyle = StyleSheet.create({
  headerContainer: {
    height: height * 0.15,
    backgroundColor: "#E11D38"
  },
  headerContents: {
    marginHorizontal: width * 0.07,
    marginTop: height * 0.05,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTextContainer: {
    width: '66%',
    paddingHorizontal: width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    flexWrap: 'wrap'
  },
  headerText: {
    fontSize: actuatedNormalize(15),
    fontFamily: "Poppins-SemiBold",
    color: "white",
    textAlign: 'center',
    width: '100%',
  },
  loginContainer: {
    width: width * 0.15,
    position: "absolute",
    right: width * 0.004
  },
  backContainer: {
    width: width * 0.15,
    position: "absolute",
    left: width * 0.01
  },
});