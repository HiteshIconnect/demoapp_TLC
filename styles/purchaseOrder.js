import { StyleSheet } from "react-native";
import { Dimensions, TouchableHighlight, Text } from "react-native";
import {actuatedNormalize} from './dynamicFonts'
 
export const purchaseOrderStyle = StyleSheet.create({
  fontPoppinsBold: { fontFamily: "Poppins-Bold" },
  fontPoppins: { fontFamily: "Poppins" },
  fontPoppinsMed: { fontFamily: "Poppins-Medium" },
  userInfoContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop:"10%",
    height: Dimensions.get("window").height * 0.09,
    width:"100%",    
   
  },
  userImage: {
    // height: "65%", width: "15%",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
  },
  userName: {
    fontWeight: "500",
    fontSize: actuatedNormalize(22),
    lineHeight: 33,
    fontFamily: "Poppins-Medium",
    lineHeight: 33,
    color:"black",
  },
  userDesgination: {
    fontSize: actuatedNormalize(12),
    lineHeight: 18,
    color: "#5C5C5C",
    fontFamily: "Poppins-Medium",
    bottom: "5%",
  },
  children: {
    flexGrow: 1,  
    alignItems: 'center',
    paddingHorizontal: "10%",
  },
  nameFlexCol: { flexDirection: "column",marginLeft:"5%" },
  barcodeContainer: {
    height: Dimensions.get("window").height * 0.07,
    width:"105%",
    flexDirection:"row",
  },
  barcode: {
    borderWidth: 1,
    borderRadius: 5,
    height: "100%",
    flex:1
  },
  barcodeFlex: {
    flexDirection: "row",
    paddingRight:"2%",
    justifyContent: "space-between",
    flex:1
  },
  barcodeInput: { fontSize: actuatedNormalize(13)},
  loadOrderContainer: {
    marginTop: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadOrderButton: {
    padding: "2%",
    borderRadius: 5,
    backgroundColor: "#E11D38",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadOrderButtonDis: {
    padding: "3%",
    borderRadius: 5,
    backgroundColor: "grey",
    width: "69%",
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  loadOrderText: {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: actuatedNormalize(15),
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  makeMargin10: { marginTop: "5%" },
  makeMargin50: {
    width:"100%",
    justifyContent:"center",
    height:Dimensions.get("window").height * 0.30,
    position:"absolute",
    top:Dimensions.get('window').height - Dimensions.get('window').height * 0.44,
  },
  recentOrderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFE7EA",
    padding: "2%",
    fontFamily: "Poppins"
  },
  recentOrderText: { fontSize: actuatedNormalize(14), fontFamily: "Poppins-Medium",color:"black" },
  viewAllText: {
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins",
    color: "#E11D38",
    textDecorationLine: "underline",
  },
  recentOrderScroll: { height: "45%", width: "100%", marginTop: "2%" },
  indOrderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginTop: "3%",
    color:"black",
  },
  makeFontBlack:{ color:"black"},
  makeFontSize16: { fontSize: actuatedNormalize(16) },
  makeFontSize10: { fontSize: actuatedNormalize(10) },
 
  recentWOcontainer: {
    flex:1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 22,
  },
  showContainer:{
    width:"100%",
    marginTop:"2%",
    height:"25%",
  }
});