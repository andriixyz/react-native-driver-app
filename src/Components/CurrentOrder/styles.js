import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  topPanel: {
    backgroundColor: "rgba(249, 255, 81,0.8)",
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  timeContainer: {
    width: 125,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 51, 255,0.7)",
    borderRadius: 15,
    alignItems: "center"
  },
  time: {
    fontWeight: "800",
    fontFamily: "Arial",
    fontSize: 20,
    color: "white"
  }
});
export default styles;
