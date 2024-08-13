import { StyleSheet } from "react-native";

export const barcodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerFlex: { justifyContent: "center", alignItems: "center" },
  scanCodeTextContainer: {
    alignItems: "center",
    position: "absolute",
    top: "10%",
  },
  scanCodeText: { fontSize: 24, fontFamily: "Poppins-SemiBold" },
  cancelBtContainer: {
    position: "absolute",
    bottom: "10%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtStyle: {
    height: 57,
    borderWidth: 1,
    borderColor: "#E11D38",
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E11D38",
    borderRadius: 5,
  },
  cancelBtText: { color: "white", fontSize: 18, fontFamily: "Poppins-SemiBold" },
});
