import { StyleSheet } from "react-native";

export const dashboardHeaderStyle = StyleSheet.create({
  dashBoardContainer: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
    // borderBottomLeftRadius:100,
    // borderBottomRightRadius:70,
    // transform : [ { scaleX : 2 } ],
    // borderBottomStartRadius : 90,
    // borderBottomEndRadius : 90,
    overflow : 'hidden',
    height: "24%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 210,
    borderBottomEndRadius: 210,
    overflow: "hidden",
    bottom:'3%'
  },
  loginContainer: { width: "15%", position: "absolute", top: '6%',right: '0.5%', },
  // child: {
  //   flex: 1,
  //   transform: [{ scaleX: 0.5 }],
  //   backgroundColor: "black",
  //   justifyContent: "center",
  // },
  // flex: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   height: 30,
  // },
  // navMargin :{ 
  //     marginLeft: 16
  // },
  // navIcon:{ width: 24, height: 16 },
  // mainIcon:{ alignItems: 'center', justifyContent: 'center', marginLeft: 110 },
  logoStyle:{ width: 100, height: 30, transform: [{ scaleX: 0.5 }] }

});
