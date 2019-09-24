import React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import NavItem from "./NavItem";
import styles from "./styles";

export default class NavigationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [1, 1, 1, 1],
      navItemsTargets: ["Menu", "Order", "Chat", "Profile"],
      navItemsIcons: [
        require("../../Images/NavigationPanel/menu.png"),
        require("../../Images/NavigationPanel/order.png"),
        require("../../Images/NavigationPanel/chat.png"),
        require("../../Images/NavigationPanel/profile.png")
      ]
    };
  }

  renderNavItem(i, target, navigate, src, selected) {
    return (
      <NavItem
        target={target}
        navigate={navigate}
        src={src}
        key={i.toString()}
        selected={selected}
      />
    );
  }

  showNavItems(navigate, currentScreen) {
    var users = [];

    for (let i = 0; i < this.state.navItems.length; ++i) {
      var selected = false;
      if (this.state.navItemsTargets[i] == currentScreen) {
        selected = true;
      }
      users.push(
        this.renderNavItem(
          i,
          this.state.navItemsTargets[i],
          navigate,
          this.state.navItemsIcons[i],
          selected
        )
      );
    }

    return users;
  }
  render() {
    return (
      <View style={styles.container}>
        {this.showNavItems(this.props.navigate, this.props.currentScreen)}
      </View>
    );
  }
}
