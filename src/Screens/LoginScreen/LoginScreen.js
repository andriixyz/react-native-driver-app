import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      login: "",
      password: "",
      error: ""
    };
  }
  static navigationOptions = {
    title: "Chat"
  };
  makeError(error) {
    this.setState({ error: error });
  }
  loading() {
    this.setState({ loading: !this.state.loading });
  }
  async saveLoginPassword(login, password) {
    await AsyncStorage.setItem("login", login);
    await AsyncStorage.setItem("password", password);
  }
  loginIn(navigate) {
    this.loading();
    fetch("http://192.168.56.1:5000/driver/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        if (responseData.response == "OK") {
          this.saveLoginPassword(this.state.login, this.state.password);
          Alert.alert("Hello " + this.state.login);
          navigate("Chat");
          this.loading();
        } else {
          this.makeError(responseData.response);
          this.loading();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.loading) {
      return (
        <ActivityIndicator style={styles.loading} size="large" color="blue" />
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require("../../Images/LoginScreen/taxi.png")}
              style={styles.logo}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.error}>{this.state.error}</Text>
              <TextInput
                placeholder="Login"
                style={styles.input}
                value={this.state.login}
                onChangeText={login => this.setState({ login })}
                name="login"
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                name="password"
              />
            </View>
            <Button
              title="LOGIN"
              onPress={() => {
                this.loginIn(navigate);
              }}
            />
          </View>
        </View>
      );
    }
  }
}
