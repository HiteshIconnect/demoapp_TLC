import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const printLabelStyles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: "5%" },
  itemDetailsContainer: {
    position: "relative",
    height: "auto",
    width:"99%",
    borderWidth: 1,
    borderRadius: 5,
    // bottom: "7%",
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    shadowColor: "#00000040",
    shadowRadius: 7,
    shadowOpacity: 2,
    // marginTop: 50,
    // bottom:"14%",
    bottom:30,
    marginTop:"5%",
  },
  flexWrapperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "4%",
    paddingHorizontal: "5%",
  },
  textSideContainer: {
    flexDirection: "column",
    flex: 0.4,
    justifyContent: "space-between",
  },
  itemNameStyle: { fontFamily: "Poppins-SemiBold", fontSize: actuatedNormalize(12) ,color:'black'},
  itemDetailsGreyed: { fontSize:actuatedNormalize(12), fontFamily: "Poppins", color: "#717171" },
  itemDetailsRed: {
    fontSize:actuatedNormalize(14),
    fontFamily: "Poppins-SemiBold",
    color: "#E11D38",
    fontWeight: "600"
  },
  flexHalf: { flex: 0.5 },
  imageStyle: { width: "auto", height: 192 },
  marginBottom5: { 
      // top:0,
      bottom: 0,
      // top: "-11%", 
      marginTop:"-4%"
    },
  scrollViewContentStyle :{ 
    justifyContent:'center',
    alignItems:"center"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFE7EA",
    borderRadius: 5,
    height: 78,
    width:"98%"
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: "#FFFFFF",
    // marginTop:5,
    // width:"97%",
    // height:"auto"

  },
  statItemFlex: { flexDirection: "column" },
  statLabel: { fontSize: actuatedNormalize(14), fontFamily: "Poppins", color: "#717171" },
  statValue: { fontSize: actuatedNormalize(18), fontFamily: "Poppins-SemiBold", color: "#E11D38" },
  updateContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    marginTop: "4%",
    width:"99%",
    borderRadius:5
  },
  updateContainer2:{
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    marginTop: "0%",
    width:"99%",
    borderRadius:5
  },
  receivedContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    paddingHorizontal: "10%",
    paddingTop:"2%",
    alignItems:'center'
    // paddingVertical: "1%",
  },
  receivedText: { fontSize: actuatedNormalize(16), fontFamily: "Poppins-SemiBold" },
  changeQtyWrapper: { flexDirection: "column" },
  receivedValue: {
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins",
    marginTop: "2%",
    lineHeight: 18,
  },
  receivedValueRed: { color: "#E11D38", fontFamily: "Poppins-SemiBold" },
  pickerWrapper: { flexDirection: "column", justifyContent: "space-between" },
  pickerWrapperFlexPadding: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  updateButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "4%",
  },
  updateButtonWidth: { width: "70%", justifyContent: "center",marginTop:"10%",marginBottom:"4%" },
  updateButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    height: 44,
    borderColor: "#E11D38",
    // marginTop: "2%",
    backgroundColor:"white",
  },
  updateButtonText: {
    
    fontSize: actuatedNormalize(14),
    lineHeight: 21,
    fontFamily: "Poppins",
    color: "#E11D38",
  },
  printLabelButtonStyle: {
    backgroundColor: "#E11D38",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "5%",
    height: 54,
    borderRadius: 5,
    width:"100%"
  },
  printLabelButtonDisableStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "5%",
    height: 54,
    borderRadius: 5,
    width:"100%"
  },
  printLabelText: {
    fontSize: actuatedNormalize(18),
    lineHeight: 27,
    fontFamily: "Poppins",
    color: "#FFFFFF",
  },
  marginTop16: {
    marginTop: 16
  },
  locationContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: "1%",
    paddingHorizontal: "1%",
  },
  locationText: {
    fontSize: actuatedNormalize(14),
    lineHeight: 21,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Poppins-Medium"
  },
  binText: {
    fontSize:actuatedNormalize(12),
    lineHeight: 18,
    color: "#494949",
    fontFamily: "Poppins"
  },
  binContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  qtyColor: { 
    color: '#E11D38',
    fontFamily: "Poppins-Medium"
  },
  qtyContainer: {
    borderBottomWidth: 1,
    padding: 12,
    borderColor: "#e0e0e0"
  },
  qtyContainerNoBorder:{
    borderBottomWidth:0
  },
  toggleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%"
  },
  pickerMargin : {
    marginTop : "4%"
  },
  pickerFirstMargin :{
    marginTop:"1%"
  },
  boxShadowGenrate:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});