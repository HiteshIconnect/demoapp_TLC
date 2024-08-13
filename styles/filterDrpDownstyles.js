import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";

export const filterDrpdownStyles = StyleSheet.create({
  dropDownMainContainer: {
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  textStyle: { fontFamily: "Poppins-Medium", fontSize: actuatedNormalize(12) },
  flatListStyle: {
    width: "100%",
    flex: 2,
    position: "absolute",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 44,
    top: 38,
    height: "auto",
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    //justifyContent: "center",
    borderBottomWidth: 0.4,
    //alignItems: "flex-start",
  },
  itemText: {
    marginLeft: "5%",
    fontFamily: "Poppins",
    fontSize: actuatedNormalize(12),
  },
});
