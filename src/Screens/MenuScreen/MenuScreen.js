import React from "react";
import {
  Text,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationPanel from "../../Components/NavigationPanel/NavigationPanel";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import styles from "./styles";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }
  exit() {
    BackHandler.exitApp();
  }
  componentDidMount() {
    (async () => {
      const login = await AsyncStorage.getItem("login");
      const password = await AsyncStorage.getItem("password");
      this.setState({ password: password });
      this.setState({ login: login });
      console.log(this.state.login);
      console.log(this.state.password);
    })();
  }

  sendChangeStatus(status) {
    fetch("http://192.168.56.1:5000/driver/changeStatus/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
        status: status
      })
    })
      .then(response => {
        Alert.alert("DONE");
      })
      .catch(error => {});
  }
  static navigationOptions = {
    title: "Menu"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(249, 249, 249)" }}>
        <CurrentOrder />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.containerStatus}
            onPress={() => {
              this.sendChangeStatus("Ready");
            }}
          >
            <Image
              source={require("../../Images/MenuScreen/ready.png")}
              style={styles.statusImage}
            />
            <Text style={styles.statusText}>Ready</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerStatus}
            onPress={() => {
              this.sendChangeStatus("Breakdown");
            }}
          >
            <Image
              source={require("../../Images/MenuScreen/wrong.png")}
              style={styles.statusImage}
            />
            <Text style={styles.statusText}>Breakdown</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerStatus}
            onPress={() => {
              this.sendChangeStatus("Making order");
            }}
          >
            <Image
              source={require("../../Images/MenuScreen/making-order.png")}
              style={styles.statusImage}
            />
            <Text style={styles.statusText}>Making order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerStatus}
            onPress={() => {
              this.sendChangeStatus("Break");
            }}
          >
            <Image
              source={require("../../Images/MenuScreen/break.png")}
              style={styles.statusImage}
            />
            <Text style={styles.statusText}>Break</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.exit} style={styles.containerStatus}>
            <Image
              source={require("../../Images/MenuScreen/exit.png")}
              style={styles.statusImage}
            />
            <Text style={styles.statusText}>Exit</Text>
          </TouchableOpacity>
        </View>

        <NavigationPanel navigate={navigate} currentScreen="Menu" />
      </View>
    );
  }
}
