import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.value.self) {
      return (
        <View style={styles.messageContaierSelf}>
          <Text>{this.props.value.role}</Text>
          <View style={[styles.message, styles.messageSelf]}>
            <Text style={styles.messageText}>{this.props.value.message}</Text>
          </View>
          <Text style={styles.time}>{this.props.value.time}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.messageContaierHim}>
          <Text>{this.props.value.role}</Text>
          <View style={[styles.message, styles.messageHim]}>
            <Text style={styles.messageText}>{this.props.value.message}</Text>
          </View>
          <Text style={styles.time}>{this.props.value.time}</Text>
        </View>
      );
    }
  }
}
