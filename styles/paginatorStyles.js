import { StyleSheet } from "react-native";

export const paginatorStyles = StyleSheet.create({
  container: {
    width: "70%",
    height: "60%",
    backgroundColor: "pink",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  pageCircle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    width: 25,
    height: 25,
    margin:3,
    justifyContent: "center",
    alignItems: "center",
  },
  pageCircleActive: {
    backgroundColor: "#E11D38",
    borderRadius: 50,
    borderColor: "#E11D38",
    borderWidth: 1,
    width: 25,
    height: 25,
    margin:3,
    justifyContent: "center",
    alignItems: "center",
  },
  pageNoText: { fontSize: 12, fontFamily: "Poppins-Medium", color: "#E11D38",marginTop:2, },
  pageNoTextActive: { fontSize: 12, fontFamily: "Poppins-Medium", color: "#FFFFFF",marginTop:2, },
  makeLeftMargin5: { marginLeft: "1%" },
});
