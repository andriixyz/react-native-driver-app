import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button
} from "react-native";
import NavigationPanel from "../../Components/NavigationPanel/NavigationPanel";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import Message from "../../Components/ChatMessage/ChatMessage";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

export default class ChatMessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ""
    };
    this.socket = new WebSocket("ws://192.168.56.1:3000/");
    this.socket.onmessage = message => {
      const m = JSON.parse(message.data);

      console.log(m);
      this.addMessage(m.role, m.text, m.time, m.self);
    };

    this.messageKey = 0;
  }

  async sendMessage() {
    const login = await AsyncStorage.getItem("login");
    const password = await AsyncStorage.getItem("password");
    const text = this.state.text;

    const message = JSON.stringify({
      role: "Driver",
      text: text,
      time: new Date(),
      login: login,
      password: password
    });
    this.socket.send(message);
  }
  componentDidMount() {
    setTimeout(() => {
      // this.addMessage("Manager", "Hello", "21:22:31", true);
      //this.addMessage("I", "Hello", "21:22:31", false);
    }, 3000);
  }
  static navigationOptions = {
    title: "Chat"
  };

  addMessage(role, message, time, self) {
    const messages = this.state.messages.slice();
    messages[++this.messageKey] = {
      self: self,
      role: role,
      message: message,
      time: time
    };

    this.setState({ messages: messages });
  }
  showMessages() {
    var messages = [];
    for (let i = 0; i < this.state.messages.length; ++i) {
      messages.push(this.renderMessage(i));
    }
    this.messageKey = this.state.messages.length - 1;

    return messages;
  }
  renderMessage(i) {
    return <Message value={this.state.messages[i]} key={i.toString()} />;
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <CurrentOrder />
        <ScrollView>{this.showMessages()}</ScrollView>
        <View style={styles.sendMessageContainer}>
          <TextInput
            placeholder="Type here..."
            style={styles.inputText}
            onChangeText={text => this.setState({ text })}
          />
          <Button
            title="Send"
            onPress={() => {
              this.sendMessage();
            }}
          />
        </View>

        <NavigationPanel navigate={navigate} currentScreen="Chat" />
      </View>
    );
  }
}
