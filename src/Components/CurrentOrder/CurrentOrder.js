import React from "react";
import { Text, View, Image, TouchableOpacity, Button } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export default class CurrentOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "00:00:00",
      cost: 0,
      text: ""
    };
  }
  async getCurrentOrder() {
    fetch("http://192.168.56.1:5000/driver/getCurrentOrder/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: await AsyncStorage.getItem("login"),
        password: await AsyncStorage.getItem("password")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        this.setState({ time: responseData.time });
        this.setState({ cost: responseData.cost });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getCurrentOrder();
  }
  render() {
    return (
      <View style={styles.topPanel}>
        <View style={{ marginRight: 25 }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../Images/OrderScreen/money.png")}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "900",
              fontSize: 13
            }}
          >
            {this.state.cost}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}> {this.state.time}</Text>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Button
            title="Reload"
            onPress={() => {
              this.getCurrentOrder();
            }}
          />
        </View>
      </View>
    );
  }
}
