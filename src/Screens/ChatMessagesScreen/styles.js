import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    marginBottom: 5
  },
  inputText: {
    backgroundColor: "white",
    width: Dimensions.get("window").width - 50,
    paddingLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: "space-around"
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
    width: 150,
    alignItems: "center"
  },

  messageText: {
    fontSize: 15
  }
});
export default styles;
