import { StyleSheet } from "react-native";

export const changeQtyInputStyle = StyleSheet.create({
  container: { flexDirection: "column" },
  inputFlexWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 2,
    width: 100,
    height: 45,
    backgroundColor:"white"
  },
  imageWidth:{},
  inputStyle: { color: "#E11D38", width: "35%",textAlign:"center"},
});
