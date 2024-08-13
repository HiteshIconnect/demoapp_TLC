import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const loaderModalStyles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    height: "40%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    top: "3%",
  },
  barStyle: { height: "4%", backgroundColor: "rgba(225, 29, 56, 0.25)" },
  contentContainer: {
    height: "96%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "80%",
  },
  titleStyle: {
    fontSize: actuatedNormalize(23),
    fontFamily: "Poppins-SemiBold",
  },
  messageStyle: {
    fontSize: actuatedNormalize(12),
    fontFamily: "Poppins",
    paddingHorizontal: 50,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#E11D38",
    width: "60%",
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins",
    fontSize: actuatedNormalize(16),
    fontWeight: "bold",
  },
});
