import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  account: {
    alignItems: "center"
  },
  accountName: {
    fontWeight: "900",
    fontSize: 20,
    margin: 10
  },
  messageContaierSelf: {
    marginLeft: 15
  },
  messageContaierHim: {
    alignItems: "flex-end",
    marginRight: 15
  },
  messageSelf: {
    backgroundColor: "rgba(248, 255, 71,0.4)"
  },
  messageHim: {
    backgroundColor: "rgba(68, 130, 255,0.4)"
  },
  message: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width - 50,
    alignItems: "center"
  },

  messageText: {
    fontSize: 15,
    flexDirection: "column"
  }
});
export default styles;
