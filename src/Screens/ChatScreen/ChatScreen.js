import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import NavigationPanel from "../../Components/NavigationPanel/NavigationPanel";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import styles from "./styles";

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Chat"
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 1 }}>
          <CurrentOrder />
          <View style={styles.users}>
            <TouchableOpacity
              style={styles.user}
              onPress={() => {
                navigate("ChatMessages", { destination: "Client" });
              }}
            >
              <Image source={require("../../Images/ChatScreen/user.png")} />
              <Text style={styles.userText}>Send message to user</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.user}
              onPress={() => {
                navigate("ChatMessages", { destination: "Manager" });
              }}
            >
              <Image source={require("../../Images/ChatScreen/manager.png")} />
              <Text style={styles.userText}>Send message to manager</Text>
            </TouchableOpacity>
          </View>
        </View>
        <NavigationPanel navigate={navigate} currentScreen="Chat" />
      </View>
    );
  }
}
