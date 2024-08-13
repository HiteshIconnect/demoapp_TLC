import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const locationCardStyles = StyleSheet.create({
  headerText: {
    position: "relative",
    left: "4%",
    width: "100%",
    fontSize: actuatedNormalize(18),
    fontFamily: "Poppins-SemiBold",
    marginTop: "6%",
    color:"black",
  },
  container: {
    width: "99%",
    elevation: 3,
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 73,
    marginBottom: "2%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,

  },
  pickerContainer: {
    height: '100%',
    // backgroundColor:"red",
    // justifyContent:'space-evenly',
    // alignItems:'center',
    // paddingTop:'6%',
    paddingHorizontal: "7%"
  }
});
