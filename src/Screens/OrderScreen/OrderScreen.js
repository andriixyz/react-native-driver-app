import React from "react";
import { Text, View, Picker, Image, Button } from "react-native";
import NavigationPanel from "../../Components/NavigationPanel/NavigationPanel";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      cost: "",
      description: "",
      placeOfArrival: "",
      addresses: [],
      time: "",
      choosedMusic: ""
    };
    this.messageKey = 0;
  }
  onScreenFocus = () => {
    this.getCurrentOrder();
  };
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
        if (responseData.notFound) {
          this.setState({ time: responseData.time });
          this.setState({ cost: responseData.cost });
          this.setState({ placeOfArrival: responseData.placeOfArrival });
          this.setState({ description: responseData.description });
          this.setState({ choosedMusic: responseData.choosedMusic });
        } else {
          this.setState({ addresses: responseData.destinationPoints });
          this.setState({ time: responseData.time });
          this.setState({ cost: responseData.cost });
          this.setState({ placeOfArrival: responseData.placeOfArrival });
          this.setState({ description: responseData.description });
          this.setState({ choosedMusic: responseData.choosedMusic });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  static navigationOptions = {
    title: "Order"
  };
  addAddress(address) {
    const messages = this.state.addresses.slice();
    messages[++this.messageKey] = {
      address: address
    };

    this.setState({ addresses: messages });
  }

  showAddresses() {
    var messages = [];

    for (let i = 0; i < this.state.addresses.length; ++i) {
      messages.push(this.renderAddress(i));
    }
    this.messageKey = this.state.addresses.length - 1;

    return messages;
  }
  renderAddress(i) {
    return (
      <Picker.Item
        label={this.state.addresses[i].address}
        value="1"
        key={i.toString()}
      />
    );
  }
  componentDidMount() {
    this.getCurrentOrder();
    this.props.navigation.addListener("didFocus", this.onScreenFocus);
  }
  async changeOrderStatus() {
    fetch("http://192.168.56.1:5000/driver/changeOrderStatus/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: await AsyncStorage.getItem("login"),
        password: await AsyncStorage.getItem("password"),
        status: this.state.status
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {})
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topPanel}>
            <Button
              title="Reload"
              onPress={() => {
                this.getCurrentOrder();
              }}
            />
            <View>
              <Picker
                selectedValue={this.state.status}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ status: itemValue });
                  this.changeOrderStatus();
                }}
              >
                <Picker.Item
                  label="Driver go to the order"
                  value="Driver go to the order"
                />
                <Picker.Item
                  label="Waiting for client"
                  value="Waiting for client"
                />
                <Picker.Item label="Making order" value="Making order" />
                <Picker.Item
                  label="Order is complete"
                  value="Order is complete"
                />
              </Picker>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{this.state.time}</Text>
              </View>
            </View>

            <View style={styles.containerTimerMoney}>
              <View>
                <Image source={require("../../Images/OrderScreen/money.png")} />
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

              <View style={{ marginTop: 25 }}>
                <Text style={{ fontSize: 15 }}>Place of arrival:</Text>
                <Text style={{ fontSize: 20, color: "black" }}>
                  {this.state.placeOfArrival}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.containerStatus}>
            <Image source={require("../../Images/OrderScreen/address.png")} />
            <Text>Addresses:</Text>
            <Picker style={styles.statusText}>{this.showAddresses()}</Picker>
          </View>
          <View style={styles.containerStatus}>
            <Image
              source={require("../../Images/OrderScreen/description.png")}
            />

            <Text style={styles.description}>{this.state.description}</Text>
          </View>
          <View style={styles.containerStatus}>
            <Image source={require("../../Images/OrderScreen/music.png")} />

            <Text style={styles.fontSize}>{this.state.choosedMusic}</Text>
          </View>
        </View>
        <NavigationPanel navigate={navigate} currentScreen="Order" />
      </View>
    );
  }
}
