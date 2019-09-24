import { StyleSheet, Dimensions, Alert } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(244, 244, 255,0.8)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  loading: {
    marginTop: 25
  },
  logo: {
    marginTop: 50
  },
  inputContainer: {
    marginTop: 70
  },
  input: {
    borderRadius: 15,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 50,
    marginBottom: 25
  },
  error: {
    color: "red",
    marginBottom: 10
  }
});

export default styles;
