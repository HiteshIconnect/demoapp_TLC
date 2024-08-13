import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";


export const pickerStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    width:'100%',
    alignItems: "center",
    paddingTop: "2%",
    marginHorizontal:10,
    
  },
  flatListContentStyle: { },
  flatListStyle: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1, 
    zIndex: 50,
    position: "relative",
    top: 0,
    height: 90,
  },
  itemStyle: {
    borderBottomWidth: 0.4,
    padding: "2%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemTextStyle: {
    fontFamily: "Poppins",
    fontSize:actuatedNormalize(16),
    lineHeight: 24,
    //marginLeft: "2%",
    width:'90%',
    textAlign:'center',
  },
  opacityWrapper: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "2%",
    paddingVertical: "2%",
    borderBottomWidth: 0.5,
  },
  textStyle: {
    fontSize: actuatedNormalize(18),
    fontFamily: "Poppins",
    color: "rgba(225, 29, 56, 0.5)",
    textAlign:"left"
    //textAlign:'center',
  },
});