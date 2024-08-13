import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";
export const capModalStyles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    top: "3%",
    padding: "10%",
  },
  descContainer: { justifyContent: "center", alignItems: "center", flex: 0.4 },
  descContText: {
    fontSize: actuatedNormalize(24),
    fontFamily: "Poppins-SemiBold",
    color: "#E11D38",
  },
  secondaryContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryContText: { fontSize: actuatedNormalize(16), fontFamily: "Poppins" },
  buttonWrapper: { justifyContent: "center", alignItems: "center", flex: 1 },
  buttonContainer: {
    flex: 0.4,
    width: "70%",
    backgroundColor: "#E11D38",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    fontSize: actuatedNormalize(18),
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
});
