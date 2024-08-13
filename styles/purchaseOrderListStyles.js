import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import {actuatedNormalize} from './dynamicFonts'

export const purchaseOrdListStyles = StyleSheet.create({
  container: { paddingHorizontal: "8%", flex: 1 },
  updatePoContainer: {
    height: 'auto',
    backgroundColor: "white",
    position: "relative",
    bottom: "5%",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  orderDetails: {
    flexDirection: "row",
    padding: "5%",
    justifyContent: "flex-end",
  },
  orderTextFlex: { flexDirection: "column", width: 0, flex: 1, flexGrow: 1 },
  purchaseOrderLabelText: { fontSize: actuatedNormalize(12), fontFamily: "Poppins-SemiBold" ,color:"black"},
  makeColorRed: { color: "#E11D38",fontSize: actuatedNormalize(12), fontFamily: "Poppins-SemiBold" },
  updatePoButton: {
    height: 32,
    width: 108,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E11D38",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    elevation: 3
  },
  updatePoText: { color: "#E11D38", fontSize: actuatedNormalize(14), fontFamily: "Poppins", fontWeight: 'bold' },
  makePadding1: { paddingHorizontal: "5%", paddingBottom: '2%' },
  makeItemCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ptbar1: {
    height: 6,
    width: "60%",
    backgroundColor: "#FF0023",
    borderRadius: 50,
    zIndex: 100,
    left: 3
  },
  ptBat2: {
    height: 6,
    width: "40%",
    backgroundColor: "rgba(225, 29, 56, 0.25)",
    borderRadius: 50,
  },
  goBatTextRight: {
    left: 3
  },
  makeSpaceBet: {
    flexDirection: "row",
    justifyContent: "space-between",
    // bottom: "5%",
  },
  ptText: { fontSize: actuatedNormalize(10), color: "#717171" },
  searchItemContainer: {
    width: "65%",
    height: 38,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
  },
  spaceAroundCenter: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInputWidth: { width: '80%' },
  drpDownContainer: {
    width: "100%",
    height: 38,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
  },
  makeRow: { flexDirection: "row", justifyContent: "space-evenly" },
  makeMargin5: { marginTop: "2%", bottom: 0, height: "90%" },
  makeScrollChildCenter: { justifyContent: "center", alignItems: "center" },
  itemViewShadow: {
    marginTop: "5%",
    width: "98%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
  },
  itemContainer: {
    // backgroundColor:'red',
    height: Dimensions.get('window').height * 0.12,
    backgroundColor: "white",
    padding: 0
    // backgroundColor:"red"
    // borderWidth:1
  },
  itemBackground: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",

  },
  itemBoxShadow: {
    elevation: 0.5,
    // backgroundColor:'#FFFFFF',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: '#000'
  },
  font12: { fontSize: actuatedNormalize(12), fontFamily: "Poppins",color:'black' },
  itemNoPadding: { paddingLeft: '5%', paddingTop: '2%', },
  itemTextGrp: {
    // backgroundColor:"yellow",
    flexDirection: "column",
    width: 0,
    flex: 1,
    flexGrow: 1,
    paddingTop: '2%',
    // paddingBottom:"1%",
    marginLeft: "3%",
    height: "75%",
    // paddingBottom: "2%",
    justifyContent: "space-evenly"
  },
  font10: { fontFamily: "Poppins-SemiBold", fontSize: actuatedNormalize(10),color:'black' },
  font12Grey: { fontSize: actuatedNormalize(12), color: "#717171" },
  makeSerialMargin: { marginTop: "3%" },
  receivedContainer: {
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    width: 93,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00840D",
    borderColor: "#FFFFFF"
  },
  font10White: { fontFamily: "Poppins", fontSize: actuatedNormalize(10), color: "#FFFFFF" },
  summaryContainer: {
    backgroundColor: "#FFE7EA",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
  },
  font10black: { fontFamily: "Poppins", fontSize: actuatedNormalize(10), color: "#494949" },
  colorRed: { color: "#E11D38" },
  paginatorContainer: {
    height: "10%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#fff"
  },
  paginatorAlign: {
    width: "90%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageSearchContainer: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pageSearchInput: {
    borderWidth: 1,
    width: "80%",
    height: 30,
    borderColor: "#E11D38",
    borderRadius: 5,
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins",
    paddingLeft: "8%",
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  pageSerachButtonFlex: {
    alignItems: "center",
    justifyContent: "center"
  }
});
