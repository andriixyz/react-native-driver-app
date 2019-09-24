import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topPanel: {
    backgroundColor: "rgba(249, 255, 81,0.8)",
    height: 275,
    alignItems: "center"
  },
  containerTimerMoney: {
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
    width: Dimensions.get("window").width
  },
  containerStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(234, 242, 255,0.8)"
  },
  statusText: {
    width: 150,
    height: 100,
    fontSize: 20,
    marginLeft: 20
  },
  description: {
    marginLeft: 15,
    fontSize: 10,
    height: 75,
    width: 225,
    alignItems: "center"
  },
  music: {
    fontSize: 15
  },
  timeContainer: {
    width: 200,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 51, 255,0.7)",
    borderRadius: 15,
    alignItems: "center"
  },
  time: {
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: 30,
    color: "white"
  }
});
export default styles;
