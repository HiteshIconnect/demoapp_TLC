import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const lotStyles = StyleSheet.create({
  container: {
    height: 69,
    backgroundColor: "white",
    elevation: 3,
    width: "99%",
    flexDirection: "column",
    justifyContent:'center',
    //alignItems: "center",
    //paddingHorizontal: "8%",
    //paddingTop:'3%',
    marginVertical: "1%",
    marginBottom: "3%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginTop:"4%",
  },
  lotNumQtyText: {
    display:'flex',
    flexDirection:'row',
    justifyContent:"space-evenly",
  },
  lotNumberText: {
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins-Medium",
    color: "#E11D38",
  },
  lotQtyText: {
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins-SemiBold",
    color: "#E11D38",
  },
  alignDeleteBtn: {
    justifyContent: "center",
    alignItems:'center',
    marginTop: "1%",
  },
  deleteBtnText: {
    fontSize: actuatedNormalize(14),
    fontFamily: "Poppins-Medium",
    color: "#E11D38",
    textDecorationLine: "underline",
  },
  makeBottomMargin: { marginBottom: "2%" },
});
