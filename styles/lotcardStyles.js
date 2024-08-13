import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const lotCardStyles = StyleSheet.create({
  headerText: {
    position: "relative",
    left: "4%",
    width: "100%",
    fontSize: actuatedNormalize(18),
    fontFamily: "Poppins-SemiBold",
    marginTop: "6%",
    color:'black',
  },
  container: {
    width: "99%",
    elevation: 3,
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 'auto',
    marginBottom: "2%",
    marginTop: "2%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    paddingBottom:"5%",

    // justifyContent:"center",
    // alignItems:"center",
  },
  lotMargin: { marginHorizontal: "10%", marginTop: "3%",padding:"2%" },
  alignDeleteBtn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "5%",
  },
  deleteBtnText: {
    fontSize: actuatedNormalize(14),
    fontFamily: "Poppins-Medium",
    color: "#E11D38",
    textDecorationLine: "underline",
  },
  makeTopMargin: { marginTop: "3%" },
  expiryInputStyle: {
    borderBottomWidth: 1,
    fontSize: actuatedNormalize(16),
    fontFamily: "Poppins",
    color: "rgba(225, 29, 56, 0.5)",
  },
  expCheckContainer:{
    flexDirection:"row",
    justifyContent:"flex-start",
    marginTop:20,
    alignItems:"center",
  },
  qtyContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    alignItems:'center',
  },
});
