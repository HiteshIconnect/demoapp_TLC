import { StyleSheet } from "react-native";
import { actuatedNormalize } from "./dynamicFonts";

export const updateModalStyle = StyleSheet.create({
  makeFLex1: { flex: 1 },
  modalLayout: {
    backgroundColor: "white",
    marginTop: "40%",
    marginHorizontal: "2%",
    flex: 0.8,
    borderRadius: 5
  },
  children: {
    flexDirection: "row",
    marginVertical: "5%",
    marginHorizontal: "5%",
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "space-between",
    height: "auto",
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  boxStyle: { flexDirection: "column", flex: 0.7, padding: "2%" },
  textStyle: { fontSize: actuatedNormalize(12), fontFamily: "Poppins-SemiBold" },
  specialRedColor: { color: "#E11D38" },
  progressContainer: { flex: 0.4, padding: "2%" },
  alignProgressText: { textAlign: "center", fontFamily: "Poppins" },
  centerProgressCircle: { justifyContent: "center", alignItems: "center" },
  twoProgressContainer: {
    flexDirection: "row",
    // marginVertical: "3%",
    justifyContent: "space-around",
  },
  poButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  poButtonStyle: {
    borderRadius: 5,
    backgroundColor: "#E11D38",
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: "65%",
  },
  poButtonText: { fontSize: actuatedNormalize(18), fontFamily: "Poppins-SemiBold", color: "white" },
});
