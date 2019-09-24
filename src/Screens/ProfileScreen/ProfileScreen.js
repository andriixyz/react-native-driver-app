import React from "react";
import { Text, View, Image, Picker, ScrollView } from "react-native";
import NavigationPanel from "../../Components/NavigationPanel/NavigationPanel";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: "",
      orders: [],
      balance: ""
    };
    this.ordersKey = 0;
  }
  static navigationOptions = {
    title: "Profile"
  };

  showOrders() {
    var messages = [];

    for (let i = 0; i < this.state.orders.length; ++i) {
      messages.push(this.renderOrder(i));
    }
    this.ordersKey = this.state.orders.length - 1;

    return messages;
  }
  renderOrder(i) {
    return (
      <View style={styles.messageContaierSelf} key={i.toString()}>
        <View style={[styles.message, styles.messageSelf]}>
          <View style={styles.messageText}>
            <Text>Time: {this.state.orders[i].time}</Text>
            <Text>Cost: {this.state.orders[i].cost}</Text>
            <Text>Place: {this.state.orders[i].place_of_arrival}</Text>
          </View>
        </View>
      </View>
    );
  }

  async getCurrentOrder() {
    fetch("http://192.168.56.1:5000/driver/getProfileInformation/", {
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
        console.log(responseData);
        this.setState({ orders: responseData[0] });
        this.setState({ balance: responseData[1] });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getCurrentOrder();
    this.props.navigation.addListener("didFocus", this.onScreenFocus);
  }
  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.getCurrentOrder();
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <CurrentOrder />
        <View style={styles.container}>
          <View style={styles.account}>
            <Text style={styles.accountName}>andriixyz</Text>
            <Image source={require("../../Images/ProfileScreen/driver.png")} />
          </View>

          <View>
            <Text>Change Car:</Text>
            <Picker
              selectedValue={this.state.car}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ car: itemValue })
              }
            >
              <Picker.Item label="Move to order" value="moveToOrder" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
          </View>
          <View>
            <Text>Balance:</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "green",
                marginLeft: 15
              }}
            >
              {this.state.balance} ГРН
            </Text>
          </View>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                Your orders:
              </Text>
              {this.showOrders()}
            </View>
          </ScrollView>
        </View>
        <NavigationPanel navigate={navigate} currentScreen="Profile" />
      </View>
    );
  }
}
